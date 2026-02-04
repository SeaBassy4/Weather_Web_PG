const WeatherCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="card bg-base-100 shadow-md mt-4">
      <div className="card-body text-center">
        <h2 className="card-title justify-center">{data.name}</h2>

        <p className="text-4xl font-bold">
          {Math.round(data.main.temp)}°C
        </p>

        <p className="capitalize">
          {data.weather[0].description}
        </p>

        <p className="text-sm opacity-70">
          Humedad: {data.main.humidity}%
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
