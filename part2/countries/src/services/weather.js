import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_KEY;

const getWeather = (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;
  return axios.get(url).then((response) => response.data);
};

export default getWeather;
