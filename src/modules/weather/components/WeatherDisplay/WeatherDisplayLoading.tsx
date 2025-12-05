import { Skeleton } from "@/components/ui/Skeleton";

export const WeatherDisplayLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <Skeleton className="h-32 w-32" variant="circular" />
      <Skeleton className="h-16 w-48" />
      <Skeleton className="h-12 w-32" />
    </div>
  );
};
