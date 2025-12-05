"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useWeatherStore } from "@/store/recent-searches.store";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export const RecentSearches = () => {
  const { t } = useTranslation();
  const { searches, clearSearches, setSelectedCity } = useWeatherStore();

  if (searches.length === 0) {
    return null;
  }

  const renderRecentSearches = () => {
    return searches.map((weather) => (
      <Card
        key={weather.id}
        variant="outlined"
        className="cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]"
        onClick={() =>
          setSelectedCity({
            id: 0,
            name: weather.name,
            region: "",
            country: weather.country,
            lat: weather.coord.lat,
            lon: weather.coord.lon,
            url: "",
          })
        }
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={weather.iconUrl ?? ""}
              alt={weather.description}
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />

            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {weather.name}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {Math.round(weather.temperature)}°
              </div>
            </div>
          </div>
        </div>
      </Card>
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {t("recentSearches.title")}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onPress={clearSearches}
          className="text-sm"
        >
          {t("recentSearches.clear")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {renderRecentSearches()}
      </div>
    </div>
  );
};
