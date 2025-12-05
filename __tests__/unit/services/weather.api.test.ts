import { describe, it, expect, beforeEach, vi } from "vitest";
import { WeatherApi } from "@/data/weather/weather.api";
import type {
  CurrentWeatherResponse,
  CitySearchResult,
} from "@/data/weather/weather.models";

// Mock environment variable
const mockApiKey = "test-api-key";
vi.stubEnv("NEXT_PUBLIC_WEATHER_API_KEY", mockApiKey);

describe("WeatherApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  describe("getCurrentWeather", () => {
    const mockWeatherResponse: CurrentWeatherResponse = {
      location: {
        name: "London",
        region: "England",
        country: "United Kingdom",
        lat: 51.5074,
        lon: -0.1278,
        tz_id: "Europe/London",
        localtime_epoch: 1234567890,
        localtime: "2024-01-01 12:00",
      },
      current: {
        last_updated_epoch: 1234567890,
        last_updated: "2024-01-01 12:00",
        temp_c: 15.5,
        temp_f: 59.9,
        is_day: 1,
        condition: {
          text: "Partly cloudy",
          icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
          code: 1003,
        },
        wind_mph: 10.5,
        wind_kph: 16.9,
        wind_degree: 180,
        wind_dir: "S",
        pressure_mb: 1013.0,
        pressure_in: 29.91,
        precip_mm: 0.0,
        precip_in: 0.0,
        humidity: 65,
        cloud: 50,
        feelslike_c: 14.0,
        feelslike_f: 57.2,
        dewpoint_c: 9.0,
        dewpoint_f: 48.2,
        vis_km: 10.0,
        vis_miles: 6.0,
        uv: 3.0,
      },
    };

    it("should fetch and transform weather data successfully", async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockWeatherResponse,
      });

      const result = await WeatherApi.getCurrentWeather("London");

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("current.json?q=London")
      );
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(`key=${mockApiKey}`)
      );

      expect(result.name).toBe("London");
      expect(result.country).toBe("United Kingdom");
      expect(result.temperature).toBe(15.5);
      expect(result.feelsLike).toBe(14.0);
      expect(result.humidity).toBe(65);
      expect(result.isDay).toBe(true);
      expect(result.description).toBe("Partly cloudy");
      expect(result.weatherCode).toBe(1003);
      expect(result.iconUrl).toBe(
        "https://cdn.weatherapi.com/weather/64x64/day/116.png"
      );
      expect(result.windSpeed).toBeCloseTo(16.9 / 3.6, 2); // km/h to m/s conversion
      expect(result.coord.lat).toBe(51.5074);
      expect(result.coord.lon).toBe(-0.1278);
    });

    it("should fix icon URL by replacing leading // with https://", async () => {
      const responseWithDoubleSlash = {
        ...mockWeatherResponse,
        current: {
          ...mockWeatherResponse.current,
          condition: {
            ...mockWeatherResponse.current.condition,
            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
          },
        },
      };

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => responseWithDoubleSlash,
      });

      const result = await WeatherApi.getCurrentWeather("London");

      expect(result.iconUrl).toBe(
        "https://cdn.weatherapi.com/weather/64x64/day/116.png"
      );
      expect(result.iconUrl).not.toMatch(/^\/\//); // Should not start with //
    });

    it("should handle night time (is_day = 0)", async () => {
      const nightResponse = {
        ...mockWeatherResponse,
        current: {
          ...mockWeatherResponse.current,
          is_day: 0,
        },
      };

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => nightResponse,
      });

      const result = await WeatherApi.getCurrentWeather("London");

      expect(result.isDay).toBe(false);
    });

    it("should throw error when query is empty", async () => {
      await expect(WeatherApi.getCurrentWeather("")).rejects.toThrow(
        "Query parameter is required"
      );
      await expect(WeatherApi.getCurrentWeather("   ")).rejects.toThrow(
        "Query parameter is required"
      );
    });

    it("should handle API error responses", async () => {
      const errorResponse = {
        error: {
          code: 1006,
          message: "No matching location found.",
        },
      };

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        statusText: "Bad Request",
        json: async () => errorResponse,
      });

      await expect(WeatherApi.getCurrentWeather("InvalidCity")).rejects.toThrow(
        "Weather API Error 1006: No matching location found."
      );
    });

    it("should handle network errors", async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
        new Error("Network error")
      );

      await expect(WeatherApi.getCurrentWeather("London")).rejects.toThrow(
        "Network error"
      );
    });

    it("should handle invalid response format", async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ invalid: "data" }),
      });

      await expect(WeatherApi.getCurrentWeather("London")).rejects.toThrow();
    });

    it("should encode query parameters correctly", async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockWeatherResponse,
      });

      await WeatherApi.getCurrentWeather("New York");

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("q=New%20York")
      );
    });
  });

  describe("searchCities", () => {
    const mockSearchResponse: CitySearchResult[] = [
      {
        id: 1,
        name: "London",
        region: "England",
        country: "United Kingdom",
        lat: 51.5074,
        lon: -0.1278,
        url: "https://example.com/london",
      },
      {
        id: 2,
        name: "London",
        region: "Ontario",
        country: "Canada",
        lat: 42.9849,
        lon: -81.2453,
        url: "https://example.com/london-ontario",
      },
    ];

    it("should fetch and return city search results", async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSearchResponse,
      });

      const result = await WeatherApi.searchCities("London");

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("search.json?q=London")
      );
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(`key=${mockApiKey}`)
      );

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe("London");
      expect(result[0].country).toBe("United Kingdom");
      expect(result[1].country).toBe("Canada");
    });

    it("should return empty array when query is empty", async () => {
      const result = await WeatherApi.searchCities("");
      expect(result).toEqual([]);
    });

    it("should return empty array when query is only whitespace", async () => {
      const result = await WeatherApi.searchCities("   ");
      expect(result).toEqual([]);
    });

    it("should return empty array when API returns empty array", async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      const result = await WeatherApi.searchCities("NonexistentCity");

      expect(result).toEqual([]);
    });

    it("should handle API error responses", async () => {
      const errorResponse = {
        error: {
          code: 1003,
          message: "Parameter 'q' not provided.",
        },
      };

      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        statusText: "Bad Request",
        json: async () => errorResponse,
      });

      await expect(WeatherApi.searchCities("London")).rejects.toThrow(
        "Weather API Error 1003: Parameter 'q' not provided."
      );
    });

    it("should handle network errors", async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
        new Error("Network error")
      );

      await expect(WeatherApi.searchCities("London")).rejects.toThrow(
        "Network error"
      );
    });

    it("should encode query parameters correctly", async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSearchResponse,
      });

      await WeatherApi.searchCities("São Paulo");

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("q=S%C3%A3o%20Paulo")
      );
    });
  });
});
