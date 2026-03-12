import { useEffect, useRef, useState } from "react";
import cloud_icon from "../assets/cloudy.png";
import search_icon from "../assets/search.png";
import wind_icon from "../assets/wind.png";
import "./Weather.css";
const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState({});
  const allIcons = {
    // "01d": clear_icon,
    // "01n": clear_icon,
    // "02d":cloud_icon,
    // "02n":cloud_icon,
    // "03d":cloud_icon,
    // "03n":cloud_icon,
    // // "04d":drizzle_icon,
    // // "04n":drizzle_icon,
    // "09d":rain_icon,
    // "09n":rain_icon,
    // "010d":rain_icon,
    // "010n":rain_icon,
    // "013d":snow_icon,
    // "013n":snow_icon,
  };
  const searchCity = async (city) => {
    if (city === "") {
      alert("Please enter City");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_API_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      // const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: data.weather[0].icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error(`Error fetching data`);
    }
  };

  useEffect(() => {
    searchCity("Kaski");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} placeholder="Search" />
        <img
          src={search_icon}
          alt=""
          onClick={() => searchCity(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
            alt="weather icon"
            className="weather-icon"
          />

          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={cloud_icon} alt="" />
              <div>
                <p>{weatherData.humidity}</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed} km/hr</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
