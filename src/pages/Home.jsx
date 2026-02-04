import { useState } from "react";
import { useWeather } from "../hooks/useWeather";

const Home = () => {
  const [city, setCity] = useState("");
  const { data, loading, slowNetwork, error, fetchWeather } = useWeather();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-xl font-bold mb-4">Consulta el Clima 🌤️</h2>

        <input
          className="input input-bordered w-full mb-4"
          placeholder="Ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button
          className="btn btn-primary w-full"
          onClick={() => fetchWeather(city)}
        >
          Consultar
        </button>

        {loading && <p className="mt-4">Cargando...</p>}
        {slowNetwork && <p className="text-warning mt-2">Red lenta detectada…</p>}
        {error && <p className="text-error mt-2">{error}</p>}

        {data && (
          <div className="mt-4">
            <p className="font-bold">{data.name}</p>
            <p>🌡️ {data.main.temp} °C</p>
            <p>☁️ {data.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
