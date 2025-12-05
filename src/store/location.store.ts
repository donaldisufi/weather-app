import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocationState {
  coords: { lat: number; lon: number } | null;
  isLoading: boolean;
  error: string | null;
  setCoords: (coords: { lat: number; lon: number } | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearLocation: () => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      coords: null,
      isLoading: false,
      error: null,
      setCoords: (coords) => set({ coords }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearLocation: () => set({ coords: null, error: null }),
    }),
    {
      name: "location-storage",
      partialize: (state) => ({ coords: state.coords }), // Only persist coordinates
    }
  )
);
