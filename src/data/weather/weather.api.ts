import {
  currentWeatherResponseSchema,
  citySearchResponseSchema,
  weatherApiErrorSchema,
  type CurrentWeatherResponse,
  type WeatherData,
  type CitySearchResult,
} from "./weather.models";

const WEATHER_API_BASE_URL = "https://api.weatherapi.com/v1";

const getApiKey = (): string => {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  if (!apiKey) {
    throw new Error(
      "NEXT_PUBLIC_WEATHER_API_KEY is not set in environment variables"
    );
  }
  return apiKey;
};

const transformWeatherData = (
  weatherResponse: CurrentWeatherResponse
): WeatherData => {
  const { location, current } = weatherResponse;

  const iconUrl = current.condition.icon.replace(/^\/\//, "https://");

  return {
    id: `${location.lat}-${location.lon}-${Date.now()}`,
    name: location.name,
    country: location.country,
    coord: {
      lat: location.lat,
      lon: location.lon,
    },
    iconUrl,
    temperature: current.temp_c,
    feelsLike: current.feelslike_c,
    tempMin: current.temp_c,
    tempMax: current.temp_c,
    humidity: current.humidity,
    windSpeed: current.wind_kph / 3.6,
    windDirection: current.wind_degree,
    weatherCode: current.condition.code,
    isDay: current.is_day === 1,
    description: current.condition.text,
    timestamp: current.last_updated,
  };
};

export const getCurrentWeather = async (
  query: string
): Promise<WeatherData> => {
  if (!query.trim()) {
    throw new Error("Query parameter is required");
  }

  const apiKey = getApiKey();
  const url = `${WEATHER_API_BASE_URL}/current.json?q=${encodeURIComponent(
    query
  )}&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || data.error) {
    const errorData = weatherApiErrorSchema.safeParse(data);
    if (errorData.success) {
      throw new Error(
        `Weather API Error ${errorData.data.error.code}: ${errorData.data.error.message}`
      );
    }
    throw new Error(`Failed to fetch weather: ${response.statusText}`);
  }

  const validatedWeather = currentWeatherResponseSchema.parse(data);
  return transformWeatherData(validatedWeather);
};

export const searchCities = async (
  query: string
): Promise<CitySearchResult[]> => {
  if (!query.trim()) {
    return [];
  }

  const apiKey = getApiKey();
  const url = `${WEATHER_API_BASE_URL}/search.json?q=${encodeURIComponent(
    query
  )}&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || data.error) {
    const errorData = weatherApiErrorSchema.safeParse(data);
    if (errorData.success) {
      throw new Error(
        `Weather API Error ${errorData.data.error.code}: ${errorData.data.error.message}`
      );
    }
    throw new Error(`Failed to search cities: ${response.statusText}`);
  }

  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  const validatedData = citySearchResponseSchema.parse(data);

  return validatedData.map((result) => ({
    id: result.id,
    name: result.name,
    region: result.region,
    country: result.country,
    lat: result.lat,
    lon: result.lon,
    url: result.url,
  }));
};
