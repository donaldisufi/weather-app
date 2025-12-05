"use client";

import {
  ComboBox as AriaComboBox,
  Input,
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  Label,
  FieldError,
} from "react-aria-components";
import { cn } from "@/utils/cn";
import { ChevronDown, Search } from "lucide-react";
import { type Key } from "react";

interface ComboBoxOption {
  id: string | number;
  label: string;
  description?: string;
}

interface ComboBoxProps<T extends ComboBoxOption> {
  options: T[];
  value?: T | null;
  onSelectionChange?: (item: T | null) => void;
  onInputChange?: (value: string) => void;
  inputValue?: string;
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  isLoading?: boolean;
  className?: string;
  "aria-label"?: string;
}

export const ComboBox = <T extends ComboBoxOption>({
  options,
  value,
  onSelectionChange,
  onInputChange,
  inputValue,
  placeholder,
  label,
  errorMessage,
  isLoading,
  className,
  "aria-label": ariaLabel,
}: ComboBoxProps<T>) => {
  return (
    <AriaComboBox
      items={options}
      inputValue={inputValue}
      onInputChange={onInputChange}
      selectedKey={value?.id ? String(value.id) : null}
      onSelectionChange={(key: Key | null) => {
        if (!key) {
          onSelectionChange?.(null);
          return;
        }
        const selected =
          options.find((opt) => String(opt.id) === String(key)) || null;
        onSelectionChange?.(selected);
      }}
      className={cn("relative w-full", className)}
      aria-label={ariaLabel || label}
      isInvalid={!!errorMessage}
      allowsEmptyCollection
      menuTrigger="input"
    >
      {label && (
        <Label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          {label}
        </Label>
      )}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none">
          <Search className="h-5 w-5" />
        </div>
        <Input
          className={cn(
            "flex h-12 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-10 py-2 text-base",
            "text-gray-900 placeholder:text-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent",
            "dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:ring-white",
            "disabled:cursor-not-allowed disabled:opacity-50",
            errorMessage && "border-red-500 focus:ring-red-500"
          )}
          placeholder={placeholder}
        />
        <Button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <ChevronDown className="h-5 w-5" />
        </Button>
      </div>
      {errorMessage && (
        <FieldError className="text-sm text-red-500 mt-1">
          {errorMessage}
        </FieldError>
      )}
      <Popover
        className="w-(--trigger-width) min-w-(--trigger-width)"
        placement="bottom start"
      >
        <ListBox
          className="max-h-60 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900 w-full"
          renderEmptyState={() => (
            <div className="px-4 py-2 text-sm text-gray-500">
              {isLoading ? "Loading..." : "No results found"}
            </div>
          )}
        >
          {(option) => {
            const item = option as T;
            return (
              <ListBoxItem
                id={String(item.id)}
                textValue={item.label}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800 outline-none"
              >
                <div className="font-medium text-gray-900 dark:text-white">
                  {item.label}
                </div>
                {item.description && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </div>
                )}
              </ListBoxItem>
            );
          }}
        </ListBox>
      </Popover>
    </AriaComboBox>
  );
};
