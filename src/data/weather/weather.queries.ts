import { useQuery } from "@tanstack/react-query";
import { getCurrentWeather, searchCities } from "./weather.api";
import type { WeatherData, CitySearchResult } from "./weather.models";

export const weatherQueryKeys = {
  all: ["weather"] as const,
  current: (query: string) => ["weather", "current", query] as const,
  citySearch: (query: string) => ["weather", "search", query] as const,
} as const;

export const useCurrentWeatherQuery = (query: string) => {
  return useQuery<WeatherData, Error>({
    queryKey: weatherQueryKeys.current(query),
    queryFn: () => getCurrentWeather(query),
    enabled: !!query && query.trim().length > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useSearchCitiesQuery = (query: string) => {
  return useQuery<CitySearchResult[], Error>({
    queryKey: weatherQueryKeys.citySearch(query),
    queryFn: () => searchCities(query),
    enabled: !!query && query.trim().length >= 2,
  });
};
