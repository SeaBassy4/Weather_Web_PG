import {
  WeatherAPIError,
  NetworkError,
  TimeoutError,
  CityNotFoundError,
  RateLimitError,
} from "../errors/weatherErrors";

import { validateCity, validateTimeout } from "../utils/validators";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;

// Cache
const weatherCache = new Map();
const CACHE_TTL = 10 * 60 * 1000;

export const getWeatherByCity = async (
  city,
  timeoutMs = 10000,
  useCache = true,
) => {
  validateTimeout(timeoutMs);
  const sanitizedCity = validateCity(city);
  const cacheKey = sanitizedCity.toLowerCase();

  if (useCache) {
    const cached = weatherCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return { ...cached.data, _cached: true };
    }
  }

  try {
    const data = await fetchWeatherFromAPI(sanitizedCity, timeoutMs);

    weatherCache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });

    return data;
  } catch (error) {
    const cached = weatherCache.get(cacheKey);
    if (cached) {
      return { ...cached.data, _cached: true, _stale: true };
    }
    throw error;
  }
};

async function fetchWeatherFromAPI(city, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&lang=es`,
      { signal: controller.signal },
    );

    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new CityNotFoundError(city);
        case 401:
          throw new WeatherAPIError("Invalid API key", "AUTH_ERROR");
        case 429:
          throw new RateLimitError();
        default:
          throw new WeatherAPIError("Weather service error");
      }
    }

    const data = await response.json();

    if (!isValidWeatherData(data)) {
      throw new WeatherAPIError(
        "Invalid weather data received",
        "DATA_VALIDATION_ERROR",
      );
    }

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new TimeoutError(`Request timed out after ${timeoutMs}ms`);
    }

    if (error.message.includes("Failed to fetch")) {
      throw new NetworkError("No internet connection");
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function isValidWeatherData(data) {
  return (
    data &&
    data.location &&
    data.current &&
    typeof data.current.temp_c === "number"
  );
}
