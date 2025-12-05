import { useQuery } from "@tanstack/react-query";
import { WeatherApi } from "./weather.api";
import type { WeatherData, CitySearchResult } from "./weather.models";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace WeatherQueries {
  /**
   * Query keys factory for weather-related queries
   */
  export const queryKeys = {
    all: ["weather"] as const,
    current: (query: string) => [...queryKeys.all, "current", query] as const,
    citySearch: (query: string) => [...queryKeys.all, "search", query] as const,
  };

  /**
   * Query hook for current weather by city name or coordinates
   * The query can be a city name (e.g., "London") or coordinates in "lat,lon" format
   */
  export const useCurrentWeatherQuery = (query: string) => {
    return useQuery<WeatherData, Error>({
      queryKey: queryKeys.current(query),
      queryFn: () => WeatherApi.getCurrentWeather(query),
      enabled: !!query && query.trim().length > 0,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    });
  };

  /**
   * Query hook for city search/autocomplete
   */
  export const useSearchCitiesQuery = (query: string) => {
    return useQuery<CitySearchResult[], Error>({
      queryKey: queryKeys.citySearch(query),
      queryFn: () => WeatherApi.searchCities(query),
      enabled: !!query && query.trim().length >= 2,
    });
  };
}
