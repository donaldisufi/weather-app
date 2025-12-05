import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// WeatherAPI.com Response Schemas
export const weatherApiLocationSchema = z.object({
  name: z.string(),
  region: z.string(),
  country: z.string(),
  lat: z.number(),
  lon: z.number(),
  tz_id: z.string(),
  localtime_epoch: z.number(),
  localtime: z.string(),
});

export const weatherApiConditionSchema = z.object({
  text: z.string(),
  icon: z.string(),
  code: z.number(),
});

export const weatherApiCurrentSchema = z.object({
  last_updated_epoch: z.number(),
  last_updated: z.string(),
  temp_c: z.number(),
  temp_f: z.number(),
  is_day: z.number(),
  condition: weatherApiConditionSchema,
  wind_mph: z.number(),
  wind_kph: z.number(),
  wind_degree: z.number(),
  wind_dir: z.string(),
  pressure_mb: z.number(),
  pressure_in: z.number(),
  precip_mm: z.number(),
  precip_in: z.number(),
  humidity: z.number(),
  cloud: z.number(),
  feelslike_c: z.number(),
  feelslike_f: z.number(),
  windchill_c: z.number().optional(),
  windchill_f: z.number().optional(),
  heatindex_c: z.number().optional(),
  heatindex_f: z.number().optional(),
  dewpoint_c: z.number(),
  dewpoint_f: z.number(),
  vis_km: z.number(),
  vis_miles: z.number(),
  uv: z.number(),
  gust_mph: z.number().optional(),
  gust_kph: z.number().optional(),
  short_rad: z.number().optional(),
  diff_rad: z.number().optional(),
  dni: z.number().optional(),
  gti: z.number().optional(),
});

export const currentWeatherResponseSchema = z.object({
  location: weatherApiLocationSchema,
  current: weatherApiCurrentSchema,
});

export const citySearchResultSchema = z.object({
  id: z.number(),
  name: z.string(),
  region: z.string(),
  country: z.string(),
  lat: z.number(),
  lon: z.number(),
  url: z.string(),
});

export const citySearchResponseSchema = z.array(citySearchResultSchema);

export const weatherApiErrorSchema = z.object({
  error: z.object({
    code: z.number(),
    message: z.string(),
  }),
});

// Transformed Weather Data Schema (for app use)
export const weatherDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  country: z.string(),
  coord: z.object({
    lat: z.number(),
    lon: z.number(),
  }),
  iconUrl: z.string().optional(),
  temperature: z.number(),
  feelsLike: z.number(),
  tempMin: z.number(),
  tempMax: z.number(),
  humidity: z.number(),
  windSpeed: z.number(),
  windDirection: z.number(),
  weatherCode: z.number(),
  isDay: z.boolean(),
  description: z.string(),
  timestamp: z.string(),
});

// Form Schemas
export const citySearchFormSchema = z.object({
  city: z.string().min(1, "City name is required"),
});

// Export Types
export type CurrentWeatherResponse = z.infer<
  typeof currentWeatherResponseSchema
>;
export type WeatherApiLocation = z.infer<typeof weatherApiLocationSchema>;
export type WeatherApiCurrent = z.infer<typeof weatherApiCurrentSchema>;
export type WeatherApiCondition = z.infer<typeof weatherApiConditionSchema>;
export type CitySearchResult = z.infer<typeof citySearchResultSchema>;
export type CitySearchResponse = z.infer<typeof citySearchResponseSchema>;
export type WeatherApiError = z.infer<typeof weatherApiErrorSchema>;
export type WeatherData = z.infer<typeof weatherDataSchema>;
export type CitySearchFormData = z.infer<typeof citySearchFormSchema>;

// Export Resolvers for react-hook-form
export const weatherResolver = zodResolver(weatherDataSchema);
export const citySearchFormResolver = zodResolver(citySearchFormSchema);
