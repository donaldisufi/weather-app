"use client";

import { useLocationStore } from "@/store/location.store";

/**
 * Checks the current permission status for geolocation
 * @returns Promise resolving to "granted" | "prompt" | "denied"
 */
const checkPermissionStatus = async (): Promise<
  "granted" | "prompt" | "denied"
> => {
  if (!navigator.permissions) {
    // Permissions API not supported, assume prompt state
    return "prompt";
  }

  try {
    const result = await navigator.permissions.query({
      name: "geolocation" as PermissionName,
    });
    return result.state as "granted" | "prompt" | "denied";
  } catch {
    // If query fails, assume prompt state
    return "prompt";
  }
};

/**
 * Hook to request user's location and store it in Zustand store.
 * Returns a function to trigger location request.
 * To read location data, use useLocationStore() directly.
 */
export const useLocation = () => {
  const { setCoords, setLoading, setError } = useLocationStore();

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    // Check permission status first
    const permissionStatus = await checkPermissionStatus();

    if (permissionStatus === "denied") {
      setError(
        "Location permission was denied. Please enable it in your browser settings and try again."
      );
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
          setError(
            "Location permission denied. Please enable it in your browser settings."
          );
        } else {
          setError("Location unavailable");
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
