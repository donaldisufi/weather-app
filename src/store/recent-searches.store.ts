import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  WeatherData,
  CitySearchResult,
} from "@/data/weather/weather.models";
import { MAX_RECENT_SEARCHES } from "@/constants/maxRecentSearches";

interface WeatherStore {
  searches: WeatherData[];
  selectedCity: CitySearchResult | null;
  useCurrentLocation: boolean;
  addSearch: (weatherData: WeatherData) => void;
  clearSearches: () => void;
  setSelectedCity: (city: CitySearchResult | null) => void;
  setUseCurrentLocation: (use: boolean) => void;
}

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set) => ({
      searches: [],
      selectedCity: null,
      useCurrentLocation: true,
      addSearch: (weatherData: WeatherData) =>
        set((state) => {
          const filtered = state.searches.filter(
            (search) => search.name !== weatherData.name
          );

          const newSearches = [weatherData, ...filtered].slice(
            0,
            MAX_RECENT_SEARCHES
          );

          return { searches: newSearches };
        }),
      clearSearches: () => set({ searches: [] }),
      setSelectedCity: (city: CitySearchResult | null) =>
        set({ selectedCity: city, useCurrentLocation: city === null }),
      setUseCurrentLocation: (use: boolean) =>
        set((state) => ({
          useCurrentLocation: use,
          selectedCity: use ? null : state.selectedCity,
        })),
    }),
    {
      name: "weather-storage",
    }
  )
);

export const useRecentSearchesStore = useWeatherStore;
