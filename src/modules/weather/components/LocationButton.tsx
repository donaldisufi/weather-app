"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { useWeatherStore } from "@/store/recent-searches.store";
import { useLocationStore } from "@/store/location.store";
import { useLocation } from "@/modules/weather/hooks/useLocation";
import { MapPin } from "lucide-react";
import { useEffect } from "react";

export const LocationButton = () => {
  const { t } = useTranslation();
  const { setUseCurrentLocation } = useWeatherStore();
  const { coords, isLoading: locationLoading } = useLocationStore();
  const { requestLocation } = useLocation();

  useEffect(() => {
    if (!coords) {
      requestLocation();
    }
  }, [coords, requestLocation]);

  const handleUseLocationPress = () => {
    if (!coords) {
      requestLocation();
      return;
    }
    setUseCurrentLocation(true);
  };

  return (
    <Button
      variant="secondary"
      onPress={handleUseLocationPress}
      isDisabled={locationLoading}
    >
      <MapPin className="mr-2 h-4 w-4" />
      {t("search.button")}
    </Button>
  );
};
