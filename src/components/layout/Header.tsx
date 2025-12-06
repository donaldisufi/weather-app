import { LanguageSelector } from "../LanguageSelector/LanguageSelector";
import { DarkModeToggle } from "@/components/DarkModeToggle/DarkModeToggle";
import { AppTitle } from "@/components/AppTitle/AppTitle";

export const Header = () => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 dark:backdrop-blur-sm shadow-sm">
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
