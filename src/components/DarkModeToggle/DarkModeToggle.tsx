"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { Switch } from "react-aria-components";
import { cn } from "@/utils/cn";

export const DarkModeToggle = () => {
  const { t } = useTranslation();
  const { setTheme, theme, systemTheme } = useTheme();
  const isSystemDark = systemTheme === "dark";
  const isDark = theme === "dark" || (theme === "system" && isSystemDark);

  return (
    <Switch
      isSelected={isDark}
      onChange={(isSelected) => setTheme(isSelected ? "dark" : "light")}
      aria-label={isDark ? t("theme.switchToLight") : t("theme.switchToDark")}
      className={cn(
        "relative inline-flex h-7 w-12 cursor-pointer items-center rounded-full border",
        "transition-colors duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 dark:focus-visible:ring-white",
        isDark ? "bg-gray-600 border-gray-500" : "bg-gray-200 border-gray-300"
      )}
    >
      {({ isSelected }) => (
        <span
          className={cn(
            "absolute left-0.5 h-6 w-6 rounded-full bg-white shadow-md flex items-center justify-center z-10",
            "transition-transform duration-300 ease-in-out",
            isSelected ? "translate-x-5" : "translate-x-0"
          )}
        >
          {isSelected ? (
            <Moon className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
          ) : (
            <Sun className="h-3.5 w-3.5 text-gray-600" aria-hidden="true" />
          )}
        </span>
      )}
    </Switch>
  );
};
