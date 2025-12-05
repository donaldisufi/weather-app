"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-white dark:bg-gray-900",
      elevated: "bg-white shadow-lg dark:bg-gray-900",
      outlined:
        "bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl p-4 transition-all",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
