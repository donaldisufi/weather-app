/**
 * Returns Tailwind gradient classes based on weather code and time of day
 * Includes dark mode variants for better appearance in dark theme
 * @param weatherCode - WMO weather code (0-99)
 * @param isDay - Whether it's daytime
 * @returns Tailwind gradient classes string with dark mode variants
 */
export const getWeatherGradient = (
  weatherCode?: number,
  isDay?: boolean
): string => {
  if (
    weatherCode === undefined ||
    weatherCode === null ||
    isDay === undefined ||
    isDay === null
  ) {
    return "from-gray-200 via-gray-100 to-white dark:from-gray-800 dark:via-gray-700 dark:to-gray-600";
  }

  // Clear sky
  if (weatherCode === 0) {
    return isDay
      ? "from-yellow-400 via-orange-300 to-amber-200 dark:from-amber-900 dark:via-orange-800 dark:to-yellow-900"
      : "from-blue-900 via-blue-800 to-indigo-900 dark:from-indigo-950 dark:via-blue-950 dark:to-slate-950";
  }

  // Cloudy
  if (weatherCode >= 1 && weatherCode <= 3) {
    return "from-gray-400 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-500";
  }

  // Rain
  if (
    (weatherCode >= 51 && weatherCode <= 67) ||
    (weatherCode >= 80 && weatherCode <= 82)
  ) {
    return "from-blue-500 via-blue-400 to-blue-300 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700";
  }

  // Snow
  if (
    (weatherCode >= 71 && weatherCode <= 77) ||
    (weatherCode >= 85 && weatherCode <= 86)
  ) {
    return "from-blue-200 via-blue-100 to-white dark:from-slate-700 dark:via-slate-600 dark:to-slate-500";
  }

  // Thunderstorm
  if (weatherCode >= 95 && weatherCode <= 99) {
    return "from-gray-600 via-gray-500 to-gray-400 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600";
  }

  // Fog
  if (weatherCode === 45 || weatherCode === 48) {
    return "from-gray-300 via-gray-200 to-gray-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-500";
  }

  return "from-gray-200 via-gray-100 to-white dark:from-gray-800 dark:via-gray-700 dark:to-gray-600";
};
