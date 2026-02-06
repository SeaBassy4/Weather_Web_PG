import { useState } from "react";
import { getWeatherByCity } from "../services/weatherService";

export const useWeather = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [slowNetwork, setSlowNetwork] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    setSlowNetwork(false);

    // Mensaje de red lenta a los 5s
    const slowTimer = setTimeout(() => {
      setSlowNetwork(true);
    }, 5000);

    try {
      const result = await getWeatherByCity(city, 10000);
      setData(result);
    } catch (err) {
      if (err.message === "TIMEOUT") {
        setError("La solicitud tardó demasiado. Intenta más tarde.");
      } else {
        setError("No se pudo obtener el clima.");
      }
    } finally {
      clearTimeout(slowTimer);
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    slowNetwork,
    error,
    fetchWeather,
  };
};
