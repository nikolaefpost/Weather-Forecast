import {clear_sky_day, clear_sky_night, few_clouds_day, few_clouds_night, broken_clouds,
  shower_rain, rain_day, rain_night, thunderstorm_day, thunderstorm_night, snow_night, snow_day, mist} from "../assets/image/cloud/index.js";

const k = 273.15;

const toCelsius = (kelvin) => {
  if (isNaN(parseFloat(kelvin))) return kelvin
  return Math.round(parseFloat(kelvin) - k)
}

const firstLetterCapitalized = (str) => {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}

const openaiUrl = "https://api.openai.com/v1/chat/completions";


const cloudsData = {
  "01d": clear_sky_day,
  "01n": clear_sky_night,
  "02d": few_clouds_day,
  "02n": few_clouds_night,
  "03d": few_clouds_day,
  "03n": few_clouds_night,
  "04d": broken_clouds,
  "04n": broken_clouds,
  "09d": shower_rain,
  "09n": shower_rain,
  "10d": rain_day,
  "10n": rain_night,
  "11d": thunderstorm_day,
  "11n": thunderstorm_night,
  "13d": snow_night,
  "13n": snow_day,
  "50d": mist,
  "50n": mist,

}

const weekData = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
const monthData =["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

// const uvIndex = ["Low", "Low", "Low", "Moderate", "Moderate", "Moderate", "High", "High", "Very high", "Very high", "Very high", "Extreme"];

const uvIndex = (uvi, lang) => {
  switch (true) {
    case uvi <= 2:
      return lang === "en"? "Low":"Низький";
    case uvi <= 5:
      return lang === "en"? "Moderate": "Помірний";
    case uvi <= 7:
      return lang === "en"? "High": "Високий";
    case uvi <= 10:
      return lang === "en"? "Very high": "Дуже високий";
    default:
      return lang === "en"? "Extreme": "Екстрім";
  }
};

export {toCelsius, firstLetterCapitalized, cloudsData, weekData, monthData, uvIndex, openaiUrl}