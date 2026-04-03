import { useState, useEffect } from "react";

export const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!city) return;

    const apiKey = import.meta.env.VITE_WEATHER_KEY;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
      .then(res => res.json())
      .then(data => setWeather(data));
  }, [city]);

  if (!weather) return <div>Loading weather...</div>;

  const iconCode = weather?.weather?.[0].icon;

  const iconUrl = iconCode
  ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  : null;
  

  return (
    <div>
      <div>Temperature: {weather?.main?.temp} °C</div>
      {iconCode && <img src={iconUrl} alt="weather icon" />} 
      {!iconCode && <div> Not found </div>}
      <div>Wind: {weather?.wind?.speed} m/s</div>
    </div>
  );
};