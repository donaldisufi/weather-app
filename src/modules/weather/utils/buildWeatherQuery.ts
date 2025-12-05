import type { CitySearchResult } from "@/data/weather/weather.models";

interface Coordinates {
  lat: number;
  lon: number;
}

/**
 * Builds a single weather query string prioritizing selectedCity, then falling back to location
 * @param selectedCity - Selected city data (takes priority)
 * @param coords - Current location coordinates (fallback)
 * @returns Query string in format "lat,lon" or empty string if neither is available
 */
export const buildWeatherQuery = (
  selectedCity: CitySearchResult | null,
  coords: Coordinates | null
): string => {
  // Priority 1: Use selected city if available
  if (selectedCity) {
    return `${selectedCity.lat},${selectedCity.lon}`;
  }

  // Priority 2: Use location coordinates if available
  if (coords) {
    return `${coords.lat},${coords.lon}`;
  }

  // No query if neither is available
  return "";
};
