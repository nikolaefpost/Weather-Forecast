import {clear_sky_day, clear_sky_night, few_clouds_day, few_clouds_night, broken_clouds,
  shower_rain, rain_day, rain_night, thunderstorm_day, thunderstorm_night, snow_night, snow_day, mist} from "../assets/image/cloud/index.js";

const k = 273.15
const toCelsius = (kelvin) => {
  if (isNaN(parseFloat(kelvin))) return kelvin
  return Math.round(parseFloat(kelvin) - k)
}

const firstLetterCapitalized = (str) => {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}


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

export {toCelsius, firstLetterCapitalized, cloudsData, weekData}