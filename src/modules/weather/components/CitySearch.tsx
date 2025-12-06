"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchCitiesQuery } from "@/data/weather/weather.queries";
import { useDebounce } from "@/hooks/useDebounce";
import { useWeatherStore } from "@/store/recent-searches.store";
import { ComboBox } from "@/components/ui/ComboBox";
import type { CitySearchResult } from "@/data/weather/weather.models";
import type { ComboBoxOption } from "@/components/ui/ComboBox";

interface CitySearchProps {
  className?: string;
}

interface CityComboBoxOption extends ComboBoxOption {
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
    useSearchCitiesQuery(debouncedQuery);

  const comboBoxOptions: CityComboBoxOption[] = searchResults.map(
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

  const handleSelectionChange = (item: CityComboBoxOption | null) => {
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
