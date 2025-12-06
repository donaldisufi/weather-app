"use client";

import { useTranslation } from "react-i18next";
import { useLocationStore } from "@/store/location.store";

/**
 * Checks the current permission status for geolocation
 * @returns Promise resolving to "granted" | "prompt" | "denied"
 */
const checkPermissionStatus = async (): Promise<
  "granted" | "prompt" | "denied"
> => {
  if (!navigator.permissions) {
    return "prompt";
  }

  try {
    const result = await navigator.permissions.query({
      name: "geolocation" as PermissionName,
    });
    return result.state as "granted" | "prompt" | "denied";
  } catch {
    return "prompt";
  }
};

/**
 * Hook to request user's location and store it in Zustand store.
 * Returns a function to trigger location request.
 * To read location data, use useLocationStore() directly.
 */
export const useLocation = () => {
  const { t } = useTranslation();
  const { setCoords, setLoading, setError } = useLocationStore();

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      setError(t("errors.geolocationNotSupported"));
      setLoading(false);
      return;
    }

    const permissionStatus = await checkPermissionStatus();

    if (permissionStatus === "denied") {
      setError(t("errors.locationPermissionDenied"));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLoading(false);
        setError(null);
      },
      (error) => {
        setCoords(null);
        setLoading(false);
        if (error.code === error.PERMISSION_DENIED) {
          setError(t("errors.locationPermissionDeniedShort"));
        } else {
          setError(t("errors.locationUnavailable"));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return { requestLocation };
};
