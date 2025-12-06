import { describe, it, expect } from "vitest";
import { getWeatherGradient } from "@/modules/weather/utils/getWeatherGradient";

describe("getWeatherGradient", () => {
  it("should return default gradient when weatherCode is undefined", () => {
    const result = getWeatherGradient(undefined, true);
    expect(result).toContain("from-gray-200");
    expect(result).toContain("dark:from-gray-800");
  });

  it("should return default gradient when isDay is undefined", () => {
    const result = getWeatherGradient(1000, undefined);
    expect(result).toContain("from-gray-200");
    expect(result).toContain("dark:from-gray-800");
  });

  it("should return default gradient when both are undefined", () => {
    const result = getWeatherGradient(undefined, undefined);
    expect(result).toContain("from-gray-200");
    expect(result).toContain("dark:from-gray-800");
  });

  describe("Clear sky (code 1000)", () => {
    it("should return sunny gradient for day", () => {
      const result = getWeatherGradient(1000, true);
      expect(result).toContain("from-yellow-400");
      expect(result).toContain("via-orange-300");
      expect(result).toContain("dark:from-amber-900");
    });

    it("should return night gradient for night", () => {
      const result = getWeatherGradient(1000, false);
      expect(result).toContain("from-blue-900");
      expect(result).toContain("via-blue-800");
      expect(result).toContain("dark:from-indigo-950");
    });
  });

  describe("Cloudy (codes 1006, 1009)", () => {
    it("should return cloudy gradient for code 1006", () => {
      const result = getWeatherGradient(1006, true);
      expect(result).toContain("from-gray-400");
      expect(result).toContain("via-gray-300");
      expect(result).toContain("dark:from-gray-700");
    });

    it("should return cloudy gradient for code 1009", () => {
      const result = getWeatherGradient(1009, true);
      expect(result).toContain("from-gray-400");
    });
  });

  describe("Rain (codes 1063, 1183, 1195, 1240)", () => {
    it("should return rain gradient for code 1063", () => {
      const result = getWeatherGradient(1063, true);
      expect(result).toContain("from-blue-500");
      expect(result).toContain("via-blue-400");
      expect(result).toContain("dark:from-blue-900");
    });

    it("should return rain gradient for code 1183", () => {
      const result = getWeatherGradient(1183, true);
      expect(result).toContain("from-blue-500");
    });

    it("should return rain gradient for code 1195", () => {
      const result = getWeatherGradient(1195, true);
      expect(result).toContain("from-blue-500");
    });

    it("should return rain gradient for code 1240", () => {
      const result = getWeatherGradient(1240, true);
      expect(result).toContain("from-blue-500");
    });
  });

  describe("Snow (codes 1066, 1213, 1225, 1255)", () => {
    it("should return snow gradient for code 1066", () => {
      const result = getWeatherGradient(1066, true);
      expect(result).toContain("from-blue-200");
      expect(result).toContain("via-blue-100");
      expect(result).toContain("dark:from-slate-700");
    });

    it("should return snow gradient for code 1213", () => {
      const result = getWeatherGradient(1213, true);
      expect(result).toContain("from-blue-200");
    });

    it("should return snow gradient for code 1225", () => {
      const result = getWeatherGradient(1225, true);
      expect(result).toContain("from-blue-200");
    });

    it("should return snow gradient for code 1255", () => {
      const result = getWeatherGradient(1255, true);
      expect(result).toContain("from-blue-200");
    });
  });

  describe("Thunderstorm (codes 1087, 1273, 1276)", () => {
    it("should return thunderstorm gradient for code 1087", () => {
      const result = getWeatherGradient(1087, true);
      expect(result).toContain("from-gray-600");
      expect(result).toContain("via-gray-500");
      expect(result).toContain("dark:from-gray-800");
    });

    it("should return thunderstorm gradient for code 1273", () => {
      const result = getWeatherGradient(1273, true);
      expect(result).toContain("from-gray-600");
    });

    it("should return thunderstorm gradient for code 1276", () => {
      const result = getWeatherGradient(1276, true);
      expect(result).toContain("from-gray-600");
    });
  });

  describe("Fog (codes 1030, 1135, 1147)", () => {
    it("should return fog gradient for code 1030", () => {
      const result = getWeatherGradient(1030, true);
      expect(result).toContain("from-gray-300");
      expect(result).toContain("via-gray-200");
      expect(result).toContain("dark:from-gray-700");
    });

    it("should return fog gradient for code 1135", () => {
      const result = getWeatherGradient(1135, true);
      expect(result).toContain("from-gray-300");
    });

    it("should return fog gradient for code 1147", () => {
      const result = getWeatherGradient(1147, true);
      expect(result).toContain("from-gray-300");
    });
  });

  describe("Unknown codes", () => {
    it("should return default gradient for unknown code", () => {
      const result = getWeatherGradient(9999, true);
      expect(result).toContain("from-gray-200");
      expect(result).toContain("dark:from-gray-800");
    });

    it("should return default gradient for negative code", () => {
      const result = getWeatherGradient(-1, true);
      expect(result).toContain("from-gray-200");
    });
  });

  describe("Partly Cloudy (code 1003)", () => {
    it("should return partly cloudy gradient for day", () => {
      const result = getWeatherGradient(1003, true);
      expect(result).toContain("from-blue-300");
    });

    it("should return partly cloudy gradient for night", () => {
      const result = getWeatherGradient(1003, false);
      expect(result).toContain("from-slate-700");
    });
  });
});
