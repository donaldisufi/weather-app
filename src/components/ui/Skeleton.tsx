import { cn } from "@/utils/cn";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
}

const variants = {
  text: "h-4 rounded",
  circular: "rounded-full",
  rectangular: "rounded-lg",
};

export const Skeleton = ({
  className,
  variant = "rectangular",
}: SkeletonProps) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200 dark:bg-gray-800",
        variants[variant],
        className
      )}
      aria-hidden="true"
    />
  );
};
