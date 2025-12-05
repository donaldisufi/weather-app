export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherData {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: WeatherCondition[];
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
  };
  dt: number;
}

export interface CitySearchResult {
  id: number;
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export interface RecentSearch extends WeatherData {
  searchedAt: number;
}

export type WeatherTheme =
  | "sunny"
  | "cloudy"
  | "rainy"
  | "snowy"
  | "stormy"
  | "clear"
  | "default";
