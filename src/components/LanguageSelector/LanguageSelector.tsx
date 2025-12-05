"use client";

import { useTranslation } from "react-i18next";
import {
  Select,
  Button,
  ListBox,
  ListBoxItem,
  Popover,
} from "react-aria-components";
import { Globe, ChevronDown } from "lucide-react";
import { LANGUAGES } from "@/types/language";
import { type Key } from "react";
import { cn } from "@/utils/cn";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === i18n.language) || LANGUAGES[0];

  const handleLanguageChange = (key: Key | null) => {
    if (!key) return;

    const langCode = String(key);

    i18n.changeLanguage(langCode);

    if (typeof window !== "undefined") {
      localStorage.setItem("language", langCode);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        selectedKey={currentLanguage.code}
        onSelectionChange={handleLanguageChange}
        className="min-w-[140px]"
      >
        <Button
          className={cn(
            "flex h-9 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm",
            "hover:bg-gray-50",
            "focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
            "dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 dark:focus:ring-white"
          )}
        >
          <Globe className="h-4 w-4 text-gray-600 dark:text-gray-400" />

          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {currentLanguage.label}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </Button>
        <Popover
          className="w-(--trigger-width) min-w-(--trigger-width)"
          placement="bottom start"
        >
          <ListBox className="max-h-60 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900 w-full">
            {LANGUAGES.map((lang) => (
              <ListBoxItem
                key={lang.code}
                id={lang.code}
                textValue={lang.label}
                className="px-4 py-2 cursor-pointer text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800 outline-none"
              >
                {lang.label}
              </ListBoxItem>
            ))}
          </ListBox>
        </Popover>
      </Select>
    </div>
  );
};
