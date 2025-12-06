/**
 * Returns Tailwind gradient classes based on weather code and time of day
 * Includes dark mode variants for better appearance in dark theme
 * @param weatherCode - WeatherAPI.com condition code (1000, 1003, 1006, etc.)
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
    return "bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700";
  }

  // Clear/Sunny (1000) - Subtle yellow/orange hint for day, subtle blue hint for night
  if (weatherCode === 1000) {
    return isDay
      ? "bg-gradient-to-br from-amber-50 via-yellow-50 to-white dark:from-amber-950/30 dark:via-yellow-950/20 dark:to-gray-800"
      : "bg-gradient-to-br from-indigo-50 via-blue-50/50 to-white dark:from-indigo-950/50 dark:via-blue-950/40 dark:to-gray-900";
  }

  // Partly Cloudy (1003) - Subtle blue/yellow mix for day, subtle blue/gray for night
  if (weatherCode === 1003) {
    return isDay
      ? "bg-gradient-to-br from-sky-50 via-yellow-50/50 to-white dark:from-slate-800 dark:via-slate-700 dark:to-gray-800"
      : "bg-gradient-to-br from-slate-100 via-blue-50/30 to-white dark:from-slate-800 dark:via-slate-700 dark:to-gray-900";
  }

  // Cloudy/Overcast (1006, 1009) - Subtle gray
  if (weatherCode === 1006 || weatherCode === 1009) {
    return "bg-gradient-to-br from-gray-100 to-white dark:from-gray-700 dark:to-gray-800";
  }

  // Mist/Fog (1030, 1135, 1147) - Very subtle gray
  if (weatherCode === 1030 || weatherCode === 1135 || weatherCode === 1147) {
    return "bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800";
  }

  // Rain codes: 1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246 - Subtle blue hint
  if (
    weatherCode === 1063 ||
    weatherCode === 1150 ||
    weatherCode === 1153 ||
    weatherCode === 1180 ||
    weatherCode === 1183 ||
    weatherCode === 1186 ||
    weatherCode === 1189 ||
    weatherCode === 1192 ||
    weatherCode === 1195 ||
    weatherCode === 1240 ||
    weatherCode === 1243 ||
    weatherCode === 1246
  ) {
    return "bg-gradient-to-br from-blue-50 via-sky-50 to-white dark:from-blue-950/30 dark:via-sky-950/20 dark:to-gray-800";
  }

  // Snow codes: 1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258 - Subtle blue/white
  if (
    weatherCode === 1066 ||
    weatherCode === 1114 ||
    weatherCode === 1117 ||
    weatherCode === 1210 ||
    weatherCode === 1213 ||
    weatherCode === 1216 ||
    weatherCode === 1219 ||
    weatherCode === 1222 ||
    weatherCode === 1225 ||
    weatherCode === 1255 ||
    weatherCode === 1258
  ) {
    return "bg-gradient-to-br from-sky-50 via-blue-50/50 to-white dark:from-slate-800 dark:via-slate-700 dark:to-gray-800";
  }

  // Thunderstorm codes: 1087, 1273, 1276, 1279, 1282 - Subtle dark gray
  if (
    weatherCode === 1087 ||
    weatherCode === 1273 ||
    weatherCode === 1276 ||
    weatherCode === 1279 ||
    weatherCode === 1282
  ) {
    return "bg-gradient-to-br from-gray-200 via-gray-100 to-white dark:from-gray-700 dark:via-gray-800 dark:to-gray-900";
  }

  // Freezing/Sleet codes: 1168, 1171, 1198, 1201, 1204, 1207, 1249, 1252, 1237, 1261, 1264 - Subtle slate
  if (
    weatherCode === 1168 ||
    weatherCode === 1171 ||
    weatherCode === 1198 ||
    weatherCode === 1201 ||
    weatherCode === 1204 ||
    weatherCode === 1207 ||
    weatherCode === 1249 ||
    weatherCode === 1252 ||
    weatherCode === 1237 ||
    weatherCode === 1261 ||
    weatherCode === 1264
  ) {
    return "bg-gradient-to-br from-slate-100 via-slate-50 to-white dark:from-slate-700 dark:via-slate-800 dark:to-gray-800";
  }

  return "bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700";
};
