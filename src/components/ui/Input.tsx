"use client";

import { useTextField } from "react-aria";
import { useRef, type InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  description?: string;
  errorMessage?: string;
  onChange?: (value: string) => void;
}

export const Input = ({
  className,
  type = "text",
  label,
  description,
  errorMessage,
  onChange,
  placeholder,
  disabled,
  value,
  defaultValue,
  name,
  id,
  autoComplete,
}: InputProps) => {
  const ref = useRef<HTMLInputElement>(null);

  // Convert value to string if needed (useTextField expects string | undefined)
  const stringValue =
    value !== undefined
      ? typeof value === "string"
        ? value
        : Array.isArray(value)
        ? value.join(",")
        : String(value)
      : undefined;

  const stringDefaultValue =
    defaultValue !== undefined
      ? typeof defaultValue === "string"
        ? defaultValue
        : Array.isArray(defaultValue)
        ? defaultValue.join(",")
        : String(defaultValue)
      : undefined;

  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(
      {
        label,
        description,
        errorMessage,
        onChange,
        type,
        placeholder,
        isDisabled: disabled,
        value: stringValue,
        defaultValue: stringDefaultValue,
        name,
        id,
        autoComplete,
      },
      ref
    );

  return (
    <div className="w-full">
      {label && (
        <label {...labelProps} className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <input
        {...inputProps}
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base",
          "placeholder:text-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent",
          "dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:ring-white",
          "disabled:cursor-not-allowed disabled:opacity-50",
          errorMessage && "border-red-500 focus:ring-red-500",
          className
        )}
      />
      {description && !errorMessage && (
        <div {...descriptionProps} className="text-sm text-gray-500 mt-1">
          {description}
        </div>
      )}
      {errorMessage && (
        <div {...errorMessageProps} className="text-sm text-red-500 mt-1">
          {errorMessage}
        </div>
      )}
    </div>
  );
};
