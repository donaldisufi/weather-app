import { describe, it, expect } from "vitest";
import { buildWeatherQuery } from "@/modules/weather/utils/buildWeatherQuery";
import type { CitySearchResult } from "@/data/weather/weather.models";

describe("buildWeatherQuery", () => {
  const mockCity: CitySearchResult = {
    id: 1,
    name: "London",
    region: "England",
    country: "United Kingdom",
    lat: 51.5074,
    lon: -0.1278,
    url: "https://example.com/london",
  };

  const mockCoords = {
    lat: 40.7128,
    lon: -74.006,
  };

  it("should prioritize selectedCity over coords", () => {
    const result = buildWeatherQuery(mockCity, mockCoords);
    expect(result).toBe("51.5074,-0.1278");
  });

  it("should use coords when selectedCity is null", () => {
    const result = buildWeatherQuery(null, mockCoords);
    expect(result).toBe("40.7128,-74.006");
  });

  it("should return empty string when both are null", () => {
    const result = buildWeatherQuery(null, null);
    expect(result).toBe("");
  });

  it("should return empty string when selectedCity is null and coords is null", () => {
    const result = buildWeatherQuery(null, null);
    expect(result).toBe("");
  });

  it("should format coordinates correctly with selectedCity", () => {
    const cityWithDecimals: CitySearchResult = {
      ...mockCity,
      lat: 35.6762,
      lon: 139.6503,
    };
    const result = buildWeatherQuery(cityWithDecimals, null);
    expect(result).toBe("35.6762,139.6503");
  });

  it("should format coordinates correctly with coords", () => {
    const coordsWithDecimals = {
      lat: -33.8688,
      lon: 151.2093,
    };
    const result = buildWeatherQuery(null, coordsWithDecimals);
    expect(result).toBe("-33.8688,151.2093");
  });
});
