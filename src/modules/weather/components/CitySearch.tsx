"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import { WeatherQueries } from "@/data/weather/weather.queries";
import { useDebounce } from "@/hooks/useDebounce";
import { useWeatherStore } from "@/store/recent-searches.store";
import type { CitySearchResult } from "@/data/weather/weather.models";

const ComboBox = dynamic(
  () =>
    import("@/components/ui/ComboBox").then((mod) => ({
      default: mod.ComboBox,
    })),
  {
    ssr: false,
  }
);

interface CitySearchProps {
  className?: string;
}

interface ComboBoxOption {
  id: string | number;
  label: string;
  description?: string;
  country: string;
  region: string;
  lat: number;
  lon: number;
}

export const CitySearch = ({ className }: CitySearchProps) => {
  const { t } = useTranslation();
  const { setSelectedCity } = useWeatherStore();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);

  const { data: searchResults = [], isLoading: isSearching } =
    WeatherQueries.useSearchCitiesQuery(debouncedQuery);

  const comboBoxOptions: ComboBoxOption[] = searchResults.map(
    (city: CitySearchResult) => ({
      id: city.id,
      label: city.name,
      description: `${city.country}${city.region ? `, ${city.region}` : ""}`,
      country: city.country,
      region: city.region,
      lat: city.lat,
      lon: city.lon,
    })
  );

  const handleSelectionChange = (item: ComboBoxOption | null) => {
    if (item) {
      setSelectedCity({
        id: typeof item.id === "number" ? item.id : Number(item.id),
        name: item.label,
        region: item.region,
        country: item.country,
        lat: item.lat,
        lon: item.lon,
        url: "",
      });
      setSearchQuery("");
    }
  };

  return (
    <ComboBox
      options={comboBoxOptions}
      inputValue={searchQuery}
      onInputChange={setSearchQuery}
      onSelectionChange={handleSelectionChange}
      placeholder={t("search.placeholder")}
      isLoading={isSearching}
      className={className}
      aria-label={t("search.placeholder")}
    />
  );
};
