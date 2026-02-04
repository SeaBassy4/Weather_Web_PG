const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getWeatherByCity = async (city, timeoutMs = 10000) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(
      `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`,
      { signal: controller.signal },
    );

    if (!response.ok) {
      throw new Error("Ciudad no encontrada");
    }

    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("TIMEOUT");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
};
