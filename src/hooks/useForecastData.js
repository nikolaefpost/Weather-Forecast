import {useEffect, useState} from "react";
import {monthData, toCelsius} from "../helpers/index.js";
import {useLanguage} from "../context/index.js";

const useForecastData = (weatherData, locationString, isWeekly) => {
    const {lang} = useLanguage();
    const weekData = lang === "en" ?
        ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]:
        ["Нед", "Пон", "Вівт", "Сер", "Четв", "П'ятн", "Суб"];

    const [forecastData, setForecastData] = useState([]);
    const [dailyData, setDailyData] = useState({
        locationString: lang === "en" ? "enter city" : "введите город",
        temp: 273,
        description: "--",
        minTemp: 273,
        maxTemp: 273
    })

    const [weatherDetails, setWeatherDetails] = useState({})

    useEffect(() => {
        if (!weatherData?.daily) return;

        setDailyData({
            locationString: locationString,
            temp: weatherData?.current?.temp,
            description: weatherData?.current?.weather[0].description,
            minTemp: weatherData?.daily[0].temp.min,
            maxTemp: weatherData?.daily[0].temp.max,
        })

        setWeatherDetails({
            uv: weatherData?.current?.uvi,
            sunrise: weatherData?.current?.sunrise,
            sunset: weatherData?.current?.sunset,
            windDeg: weatherData?.current?.wind_deg,
            windSpeed: weatherData?.current?.wind_speed,
            rain: weatherData?.current?.rain?.lh,
            snow: weatherData?.current?.snow?.lh,
            feelsLike: weatherData?.current?.feels_like,
            humidity: weatherData?.current?.humidity,
            dewPoint: weatherData?.current?.dew_point,
            visibility: weatherData?.current?.visibility,
            pressure: weatherData?.current?.pressure,
        })

        const limitWeatherData = weatherData.hourly.slice(0, 24);

        const hourly = limitWeatherData.map(elem => {
            const date = new Date(elem.dt * 1000)
            return {
                id: elem.dt,
                hour: date.getHours(),
                day: weekData[date.getDay()],
                date: date.getDate(),
                month: monthData[date.getMonth()],
                cloudIcon: elem.weather[0].icon,
                clouds: elem.clouds,
                temp: toCelsius(elem.temp)
            }
        })

        const weekly = weatherData.daily.map(elem => {
            const date = new Date(elem.dt * 1000)
            return {
                id: elem.dt,
                hour: date.getHours(),
                day: weekData[date.getDay()],
                date: date.getDate(),
                month: monthData[date.getMonth()],
                cloudIcon: elem.weather[0].icon,
                clouds: elem.clouds,
                temp: toCelsius(elem.temp.day)
            }
        })
        setForecastData(isWeekly? weekly: hourly);
    }, [weatherData, locationString, isWeekly, lang]);

    return [dailyData, forecastData, weatherDetails];

}

export default useForecastData;