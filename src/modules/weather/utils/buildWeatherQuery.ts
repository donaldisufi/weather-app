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
  if (selectedCity) {
    return `${selectedCity.lat},${selectedCity.lon}`;
  }

  if (coords) {
    return `${coords.lat},${coords.lon}`;
  }

  return "";
};
