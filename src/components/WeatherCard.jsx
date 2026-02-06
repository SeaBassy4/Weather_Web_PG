const WeatherCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="mt-4 text-center">
      <h2 className="text-lg font-bold">
        {data.location.name}
      </h2>

      <p className="text-4xl font-semibold">
        {data.current.temp_c}°C
      </p>

      <p className="capitalize">
        {data.current.condition.text}
      </p>
    </div>
  );
};

export default WeatherCard;
