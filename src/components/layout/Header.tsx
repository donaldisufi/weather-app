import { LanguageSelector } from "../LanguageSelector/LanguageSelector";
import { DarkModeToggle } from "@/components/DarkModeToggle/DarkModeToggle";
import { AppTitle } from "@/components/AppTitle/AppTitle";

export const Header = () => {
  return (
    <header className="w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-2xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <AppTitle />

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
