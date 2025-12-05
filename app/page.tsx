import { Header } from "@/components/layout/Header";
import { WeatherDisplay } from "@/modules/weather/components/WeatherDisplay/WeatherDisplay";
import { RecentSearches } from "@/modules/weather/components/RecentSearches";
import { CitySearch } from "@/modules/weather/components/CitySearch";
import { LocationButton } from "@/modules/weather/components/LocationButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      <Header />

      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px] space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
            <div className="w-full sm:w-auto sm:min-w-[300px]">
              <CitySearch />
            </div>
            <LocationButton />
          </div>

          <div className="flex flex-col items-center gap-8 px-5 ">
            <div className="w-full ">
              <WeatherDisplay />
            </div>

            <div className="w-full ">
              <RecentSearches />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
