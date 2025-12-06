"use client";

import { useButton } from "react-aria";
import { useRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
  isDisabled?: boolean;
  onPress?: () => void;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  className,
  isDisabled,
  onPress,
  type = "button",
  ...props
}: ButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps, isPressed } = useButton(
    {
      isDisabled,
      onPress,
      type,
      ...props,
    },
    ref
  );

  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary:
      "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
    ghost:
      "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-6 text-lg",
  };

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        isPressed && "scale-95",
        className
      )}
    >
      {children}
    </button>
  );
};
