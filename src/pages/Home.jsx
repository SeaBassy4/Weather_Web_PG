import { useState } from "react";
import { useWeather } from "../hooks/useWeather";
import Loader from "../components/Loader";
import ErrorAlert from "../components/ErrorAlert";
import WeatherCard from "../components/WeatherCard";

const Home = () => {
  const [city, setCity] = useState("");
  const { data, loading, slowNetwork, error, fetchWeather } = useWeather();

  const handleSearch = () => {
    if (!city.trim()) return;
    fetchWeather(city);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h1 className="text-xl font-bold mb-4 text-center">
          Weather App 🌤️
        </h1>

        <input
          type="text"
          className="input input-bordered w-full mb-3"
          placeholder="Ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={loading}
        />

        <button
          className="btn btn-primary w-full"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Consultando..." : "Consultar clima"}
        </button>

        {loading && <Loader />}

        {slowNetwork && (
          <p className="text-warning text-sm mt-2 text-center">
            Conexión lenta detectada…
          </p>
        )}

        <ErrorAlert error={error} />

        <WeatherCard data={data} />
      </div>
    </div>
  );
};

export default Home;
