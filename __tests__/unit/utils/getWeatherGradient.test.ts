import { describe, it, expect } from "vitest";
import { getWeatherGradient } from "@/modules/weather/utils/getWeatherGradient";

describe("getWeatherGradient", () => {
  it("should return default gradient when weatherCode is undefined", () => {
    const result = getWeatherGradient(undefined, true);
    expect(result).toContain("from-gray-200");
    expect(result).toContain("dark:from-gray-800");
  });

  it("should return default gradient when isDay is undefined", () => {
    const result = getWeatherGradient(0, undefined);
    expect(result).toContain("from-gray-200");
    expect(result).toContain("dark:from-gray-800");
  });

  it("should return default gradient when both are undefined", () => {
    const result = getWeatherGradient(undefined, undefined);
    expect(result).toContain("from-gray-200");
    expect(result).toContain("dark:from-gray-800");
  });

  describe("Clear sky (code 0)", () => {
    it("should return sunny gradient for day", () => {
      const result = getWeatherGradient(0, true);
      expect(result).toContain("from-yellow-400");
      expect(result).toContain("via-orange-300");
      expect(result).toContain("dark:from-amber-900");
    });

    it("should return night gradient for night", () => {
      const result = getWeatherGradient(0, false);
      expect(result).toContain("from-blue-900");
      expect(result).toContain("via-blue-800");
      expect(result).toContain("dark:from-indigo-950");
    });
  });

  describe("Cloudy (codes 1-3)", () => {
    it("should return cloudy gradient for code 1", () => {
      const result = getWeatherGradient(1, true);
      expect(result).toContain("from-gray-400");
      expect(result).toContain("via-gray-300");
      expect(result).toContain("dark:from-gray-700");
    });

    it("should return cloudy gradient for code 2", () => {
      const result = getWeatherGradient(2, true);
      expect(result).toContain("from-gray-400");
    });

    it("should return cloudy gradient for code 3", () => {
      const result = getWeatherGradient(3, true);
      expect(result).toContain("from-gray-400");
    });
  });

  describe("Rain (codes 51-67, 80-82)", () => {
    it("should return rain gradient for code 51", () => {
      const result = getWeatherGradient(51, true);
      expect(result).toContain("from-blue-500");
      expect(result).toContain("via-blue-400");
      expect(result).toContain("dark:from-blue-900");
    });

    it("should return rain gradient for code 67", () => {
      const result = getWeatherGradient(67, true);
      expect(result).toContain("from-blue-500");
    });

    it("should return rain gradient for code 80", () => {
      const result = getWeatherGradient(80, true);
      expect(result).toContain("from-blue-500");
    });

    it("should return rain gradient for code 82", () => {
      const result = getWeatherGradient(82, true);
      expect(result).toContain("from-blue-500");
    });
  });

  describe("Snow (codes 71-77, 85-86)", () => {
    it("should return snow gradient for code 71", () => {
      const result = getWeatherGradient(71, true);
      expect(result).toContain("from-blue-200");
      expect(result).toContain("via-blue-100");
      expect(result).toContain("dark:from-slate-700");
    });

    it("should return snow gradient for code 77", () => {
      const result = getWeatherGradient(77, true);
      expect(result).toContain("from-blue-200");
    });

    it("should return snow gradient for code 85", () => {
      const result = getWeatherGradient(85, true);
      expect(result).toContain("from-blue-200");
    });

    it("should return snow gradient for code 86", () => {
      const result = getWeatherGradient(86, true);
      expect(result).toContain("from-blue-200");
    });
  });

  describe("Thunderstorm (codes 95-99)", () => {
    it("should return thunderstorm gradient for code 95", () => {
      const result = getWeatherGradient(95, true);
      expect(result).toContain("from-gray-600");
      expect(result).toContain("via-gray-500");
      expect(result).toContain("dark:from-gray-800");
    });

    it("should return thunderstorm gradient for code 99", () => {
      const result = getWeatherGradient(99, true);
      expect(result).toContain("from-gray-600");
    });
  });

  describe("Fog (codes 45, 48)", () => {
    it("should return fog gradient for code 45", () => {
      const result = getWeatherGradient(45, true);
      expect(result).toContain("from-gray-300");
      expect(result).toContain("via-gray-200");
      expect(result).toContain("dark:from-gray-700");
    });

    it("should return fog gradient for code 48", () => {
      const result = getWeatherGradient(48, true);
      expect(result).toContain("from-gray-300");
    });
  });

  describe("Unknown codes", () => {
    it("should return default gradient for unknown code", () => {
      const result = getWeatherGradient(100, true);
      expect(result).toContain("from-gray-200");
      expect(result).toContain("dark:from-gray-800");
    });

    it("should return default gradient for negative code", () => {
      const result = getWeatherGradient(-1, true);
      expect(result).toContain("from-gray-200");
    });
  });
});
