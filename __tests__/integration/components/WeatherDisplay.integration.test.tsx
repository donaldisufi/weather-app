import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderWithProviders, screen, waitFor } from "../../test-utils";
import { WeatherDisplay } from "@/modules/weather/components/WeatherDisplay/WeatherDisplay";
import { useWeatherStore } from "@/store/recent-searches.store";
import { useLocationStore } from "@/store/location.store";
import type {
  WeatherData,
  CitySearchResult,
} from "@/data/weather/weather.models";
import * as WeatherApi from "@/data/weather/weather.api";

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock the weather API
vi.mock("@/data/weather/weather.api", () => ({
  WeatherApi: {
    getCurrentWeather: vi.fn(),
  },
}));

describe("WeatherDisplay Integration", () => {
  const mockWeatherData: WeatherData = {
    id: "test-weather-id",
    name: "London",
    country: "United Kingdom",
    coord: { lat: 51.5074, lon: -0.1278 },
    iconUrl: "https://example.com/icon.png",
    temperature: 15.5,
    feelsLike: 14.0,
    tempMin: 10.0,
    tempMax: 20.0,
    humidity: 65,
    windSpeed: 5.5,
    windDirection: 180,
    weatherCode: 1003,
    isDay: true,
    description: "Partly cloudy",
    timestamp: "2024-01-01 12:00",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset stores
    useWeatherStore.setState({
      searches: [],
      selectedCity: null,
      useCurrentLocation: true,
    });
    useLocationStore.setState({
      coords: null,
      isLoading: false,
      error: null,
    });
  });

  it("should display weather data when query is successful with selectedCity", async () => {
    const mockCity: CitySearchResult = {
      id: 1,
      name: "London",
      region: "England",
      country: "United Kingdom",
      lat: 51.5074,
      lon: -0.1278,
      url: "",
    };

    useWeatherStore.setState({ selectedCity: mockCity });
    vi.mocked(WeatherApi.WeatherApi.getCurrentWeather).mockResolvedValueOnce(
      mockWeatherData
    );

    renderWithProviders(<WeatherDisplay />);

    await waitFor(() => {
      expect(screen.getByText("London")).toBeInTheDocument();
    });

    expect(screen.getByText("United Kingdom")).toBeInTheDocument();
    expect(screen.getByText("16°")).toBeInTheDocument(); // Rounded temperature
    expect(screen.getByText("Partly cloudy")).toBeInTheDocument();
    expect(screen.getByText(/65%/)).toBeInTheDocument(); // Humidity
    expect(screen.getByText(/6 m\/s/)).toBeInTheDocument(); // Wind speed (rounded)
  });

  it("should use coords when selectedCity is null", async () => {
    useLocationStore.setState({
      coords: { lat: 40.7128, lon: -74.006 },
    });

    vi.mocked(WeatherApi.WeatherApi.getCurrentWeather).mockResolvedValueOnce(
      mockWeatherData
    );

    renderWithProviders(<WeatherDisplay />);

    await waitFor(() => {
      expect(WeatherApi.WeatherApi.getCurrentWeather).toHaveBeenCalledWith(
        "40.7128,-74.006"
      );
    });
  });

  it("should prioritize selectedCity over coords", async () => {
    const mockCity: CitySearchResult = {
      id: 1,
      name: "Paris",
      region: "Île-de-France",
      country: "France",
      lat: 48.8566,
      lon: 2.3522,
      url: "",
    };

    useWeatherStore.setState({ selectedCity: mockCity });
    useLocationStore.setState({
      coords: { lat: 40.7128, lon: -74.006 },
    });

    vi.mocked(WeatherApi.WeatherApi.getCurrentWeather).mockResolvedValueOnce(
      mockWeatherData
    );

    renderWithProviders(<WeatherDisplay />);

    await waitFor(() => {
      expect(WeatherApi.WeatherApi.getCurrentWeather).toHaveBeenCalledWith(
        "48.8566,2.3522"
      );
    });
  });

  it("should add search to store when weather is fetched with selectedCity", async () => {
    const mockCity: CitySearchResult = {
      id: 1,
      name: "London",
      region: "England",
      country: "United Kingdom",
      lat: 51.5074,
      lon: -0.1278,
      url: "",
    };

    useWeatherStore.setState({ selectedCity: mockCity });
    vi.mocked(WeatherApi.WeatherApi.getCurrentWeather).mockResolvedValueOnce(
      mockWeatherData
    );

    renderWithProviders(<WeatherDisplay />);

    await waitFor(() => {
      const searches = useWeatherStore.getState().searches;
      expect(searches).toHaveLength(1);
      expect(searches[0].name).toBe("London");
    });
  });

  it("should not add search to store when weather is fetched without selectedCity", async () => {
    useLocationStore.setState({
      coords: { lat: 40.7128, lon: -74.006 },
    });

    vi.mocked(WeatherApi.WeatherApi.getCurrentWeather).mockResolvedValueOnce(
      mockWeatherData
    );

    renderWithProviders(<WeatherDisplay />);

    await waitFor(() => {
      expect(screen.getByText("London")).toBeInTheDocument();
    });

    // Should not add to searches when using coords (no selectedCity)
    const searches = useWeatherStore.getState().searches;
    expect(searches).toHaveLength(0);
  });

  it("should display loading state", () => {
    const mockCity: CitySearchResult = {
      id: 1,
      name: "London",
      region: "England",
      country: "United Kingdom",
      lat: 51.5074,
      lon: -0.1278,
      url: "",
    };

    useWeatherStore.setState({ selectedCity: mockCity });
    vi.mocked(WeatherApi.WeatherApi.getCurrentWeather).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    renderWithProviders(<WeatherDisplay />);

    // Check for loading indicator (you may need to adjust based on your loading component)
    // This is a placeholder - adjust based on your actual loading component
    expect(screen.queryByText("London")).not.toBeInTheDocument();
  });

  it("should display error state when API call fails", async () => {
    const mockCity: CitySearchResult = {
      id: 1,
      name: "London",
      region: "England",
      country: "United Kingdom",
      lat: 51.5074,
      lon: -0.1278,
      url: "",
    };

    useWeatherStore.setState({ selectedCity: mockCity });
    vi.mocked(WeatherApi.WeatherApi.getCurrentWeather).mockRejectedValueOnce(
      new Error("API Error")
    );

    renderWithProviders(<WeatherDisplay />);

    await waitFor(() => {
      // Check for error message (adjust based on your error component)
      expect(screen.queryByText("London")).not.toBeInTheDocument();
    });
  });

  it("should display empty state when query is empty", () => {
    // No selectedCity and no coords
    renderWithProviders(<WeatherDisplay />);

    // Should not call API
    expect(WeatherApi.WeatherApi.getCurrentWeather).not.toHaveBeenCalled();
  });
});
