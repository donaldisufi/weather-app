import { describe, it, expect, beforeEach } from "vitest";
import { useWeatherStore } from "@/store/recent-searches.store";
import type {
  WeatherData,
  CitySearchResult,
} from "@/data/weather/weather.models";

describe("useWeatherStore", () => {
  beforeEach(() => {
    // Reset store state before each test
    useWeatherStore.setState({
      searches: [],
      selectedCity: null,
      useCurrentLocation: true,
    });
  });

  const createMockWeatherData = (
    name: string,
    country: string = "UK",
    temperature: number = 15
  ): WeatherData => ({
    id: `${name}-${Date.now()}`,
    name,
    country,
    coord: { lat: 51.5074, lon: -0.1278 },
    iconUrl: "https://example.com/icon.png",
    temperature,
    feelsLike: 14,
    tempMin: 10,
    tempMax: 20,
    humidity: 65,
    windSpeed: 5,
    windDirection: 180,
    weatherCode: 1003,
    isDay: true,
    description: "Partly cloudy",
    timestamp: "2024-01-01 12:00",
  });

  const createMockCity = (name: string): CitySearchResult => ({
    id: 1,
    name,
    region: "England",
    country: "United Kingdom",
    lat: 51.5074,
    lon: -0.1278,
    url: "",
  });

  describe("addSearch", () => {
    it("should add a new search to the beginning of the list", () => {
      const weather1 = createMockWeatherData("London");
      const weather2 = createMockWeatherData("Paris");

      useWeatherStore.getState().addSearch(weather1);
      useWeatherStore.getState().addSearch(weather2);

      const searches = useWeatherStore.getState().searches;
      expect(searches).toHaveLength(2);
      expect(searches[0].name).toBe("Paris");
      expect(searches[1].name).toBe("London");
    });

    it("should remove duplicate searches and add new one at the beginning", () => {
      const weather1 = createMockWeatherData("London");
      const weather2 = createMockWeatherData("Paris");
      const weather3 = createMockWeatherData("London", "UK", 20); // Same name, different data

      useWeatherStore.getState().addSearch(weather1);
      useWeatherStore.getState().addSearch(weather2);
      useWeatherStore.getState().addSearch(weather3);

      const searches = useWeatherStore.getState().searches;
      expect(searches).toHaveLength(2);
      expect(searches[0].name).toBe("London");
      expect(searches[0].temperature).toBe(20); // New data
      expect(searches[1].name).toBe("Paris");
    });

    it("should respect MAX_RECENT_SEARCHES limit", () => {
      const weather1 = createMockWeatherData("London");
      const weather2 = createMockWeatherData("Paris");
      const weather3 = createMockWeatherData("Tokyo");
      const weather4 = createMockWeatherData("New York");

      useWeatherStore.getState().addSearch(weather1);
      useWeatherStore.getState().addSearch(weather2);
      useWeatherStore.getState().addSearch(weather3);
      useWeatherStore.getState().addSearch(weather4);

      const searches = useWeatherStore.getState().searches;
      expect(searches).toHaveLength(3); // MAX_RECENT_SEARCHES = 3
      expect(searches[0].name).toBe("New York");
      expect(searches[1].name).toBe("Tokyo");
      expect(searches[2].name).toBe("Paris");
      // London should be removed (oldest)
    });

    it("should handle adding the same search multiple times", () => {
      const weather = createMockWeatherData("London");

      useWeatherStore.getState().addSearch(weather);
      useWeatherStore.getState().addSearch(weather);
      useWeatherStore.getState().addSearch(weather);

      const searches = useWeatherStore.getState().searches;
      expect(searches).toHaveLength(1);
      expect(searches[0].name).toBe("London");
    });
  });

  describe("clearSearches", () => {
    it("should clear all searches", () => {
      const weather1 = createMockWeatherData("London");
      const weather2 = createMockWeatherData("Paris");

      useWeatherStore.getState().addSearch(weather1);
      useWeatherStore.getState().addSearch(weather2);
      expect(useWeatherStore.getState().searches).toHaveLength(2);

      useWeatherStore.getState().clearSearches();
      expect(useWeatherStore.getState().searches).toHaveLength(0);
    });

    it("should work when searches are already empty", () => {
      useWeatherStore.getState().clearSearches();
      expect(useWeatherStore.getState().searches).toHaveLength(0);
    });
  });

  describe("setSelectedCity", () => {
    it("should set selected city", () => {
      const city = createMockCity("London");
      useWeatherStore.getState().setSelectedCity(city);

      expect(useWeatherStore.getState().selectedCity).toEqual(city);
    });

    it("should set useCurrentLocation to false when city is set", () => {
      const city = createMockCity("London");
      useWeatherStore.setState({ useCurrentLocation: true });

      useWeatherStore.getState().setSelectedCity(city);

      expect(useWeatherStore.getState().useCurrentLocation).toBe(false);
    });

    it("should set selectedCity to null and useCurrentLocation to true when null is passed", () => {
      const city = createMockCity("London");
      useWeatherStore.getState().setSelectedCity(city);
      expect(useWeatherStore.getState().selectedCity).toEqual(city);

      useWeatherStore.getState().setSelectedCity(null);

      expect(useWeatherStore.getState().selectedCity).toBeNull();
      expect(useWeatherStore.getState().useCurrentLocation).toBe(true);
    });
  });

  describe("setUseCurrentLocation", () => {
    it("should set useCurrentLocation to true", () => {
      useWeatherStore.setState({ useCurrentLocation: false });
      useWeatherStore.getState().setUseCurrentLocation(true);

      expect(useWeatherStore.getState().useCurrentLocation).toBe(true);
    });

    it("should set useCurrentLocation to false", () => {
      useWeatherStore.setState({ useCurrentLocation: true });
      useWeatherStore.getState().setUseCurrentLocation(false);

      expect(useWeatherStore.getState().useCurrentLocation).toBe(false);
    });

    it("should clear selectedCity when useCurrentLocation is set to true", () => {
      const city = createMockCity("London");
      useWeatherStore.getState().setSelectedCity(city);
      expect(useWeatherStore.getState().selectedCity).toEqual(city);

      useWeatherStore.getState().setUseCurrentLocation(true);

      expect(useWeatherStore.getState().selectedCity).toBeNull();
    });

    it("should keep selectedCity when useCurrentLocation is set to false", () => {
      const city = createMockCity("London");
      useWeatherStore.getState().setSelectedCity(city);

      useWeatherStore.getState().setUseCurrentLocation(false);

      expect(useWeatherStore.getState().selectedCity).toEqual(city);
    });
  });
});
