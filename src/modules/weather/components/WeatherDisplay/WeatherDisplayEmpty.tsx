"use client";

import { Card } from "@/components/ui/Card";
import { useLocationStore } from "@/store/location.store";
import { useTranslation } from "react-i18next";

export const WeatherDisplayEmpty = () => {
  const { t } = useTranslation();
  const { error: locationError } = useLocationStore();

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12 px-4">
      <Card
        variant="outlined"
        className="w-full max-w-lg space-y-8 p-8 text-center"
      >
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {t("emptyState.title")}
          </h3>
          <p className="text-base text-gray-600 dark:text-gray-400">
            {t("emptyState.searchMessage")}
          </p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="mb-6 text-base text-gray-600 dark:text-gray-400">
            {t("emptyState.locationMessage")}
          </p>

          {locationError && (
            <p className="mt-4 text-sm text-red-500 dark:text-red-400">
              {locationError}
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default WeatherDisplayEmpty;
