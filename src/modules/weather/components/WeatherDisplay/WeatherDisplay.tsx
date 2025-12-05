"use client";

import HandleEmptyState from "@/components/HandleStateWrappers/HandleEmptyState";
import HandleErrorState from "@/components/HandleStateWrappers/HandleErrorState";
import HandleLoadingState from "@/components/HandleStateWrappers/HandleLoadingState";
import { WeatherQueries } from "@/data/weather/weather.queries";
import { buildWeatherQuery } from "@/modules/weather/utils/buildWeatherQuery";
import { cn } from "@/utils/cn";
import { getWeatherGradient } from "@/modules/weather/utils/getWeatherGradient";
import { useLocationStore } from "@/store/location.store";
import { useWeatherStore } from "@/store/recent-searches.store";
import { Droplets, Wind } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import WeatherDisplayEmpty from "./WeatherDisplayEmpty";
import { WeatherDisplayError } from "./WeatherDisplayError";
import { WeatherDisplayLoading } from "./WeatherDisplayLoading";

export const WeatherDisplay = () => {
  const { t } = useTranslation();
  const { selectedCity, addSearch } = useWeatherStore();
  const { coords } = useLocationStore();

  const weatherQuery = buildWeatherQuery(selectedCity, coords);

  const {
    data: weather,
    isLoading,
    error: weatherError,
  } = WeatherQueries.useCurrentWeatherQuery(weatherQuery);

  const gradient = getWeatherGradient(weather?.weatherCode, weather?.isDay);

  useEffect(() => {
    if (weather && selectedCity) {
      addSearch(weather);
    }
  }, [weather, selectedCity, addSearch]);

  return (
    <HandleLoadingState
      isLoading={isLoading}
      loadingPlaceHolder={<WeatherDisplayLoading />}
    >
      <HandleErrorState
        isError={!!weatherError}
        errorPlaceHolder={
          <WeatherDisplayError error={weatherError?.message || ""} />
        }
      >
        <HandleEmptyState
          isEmpty={!weather?.id}
          emptyPlaceHolder={<WeatherDisplayEmpty />}
        >
          {weather && (
            <div
              className={cn(
                "relative flex flex-col items-center justify-center gap-6 lg:gap-8 rounded-3xl p-8 md:p-12 lg:p-16",
                "bg-linear-to-br",
                gradient,
                "transition-all duration-500 ease-in-out animate-fade-in",
                "shadow-xl"
              )}
              key={weather?.id}
            >
              <div className="flex flex-col items-center gap-4 lg:gap-6 text-center">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 md:text-3xl">
                  {weather.name}

                  {!!weather.country && (
                    <span className="ml-2 text-lg text-gray-700 dark:text-gray-300">
                      {weather.country}
                    </span>
                  )}
                </h2>

                <div className="flex items-center gap-4 lg:gap-6">
                  <Image
                    src={weather.iconUrl ?? ""}
                    alt={weather.description}
                    width={96}
                    height={96}
                    className="w-24 h-24 object-contain"
                  />

                  <div className="flex flex-col">
                    <span className="text-7xl font-bold text-gray-900 dark:text-gray-100 md:text-8xl">
                      {Math.round(weather.temperature)}°
                    </span>
                    <p className="text-lg capitalize text-gray-700 dark:text-gray-300">
                      {weather.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 lg:mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4" />
                    <span className="font-medium">
                      {t("weather.humidity")}:
                    </span>
                    <span>{Math.round(weather.humidity)}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4" />
                    <span className="font-medium">{t("weather.wind")}:</span>
                    <span>{Math.round(weather.windSpeed)} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </HandleEmptyState>
      </HandleErrorState>
    </HandleLoadingState>
  );
};
