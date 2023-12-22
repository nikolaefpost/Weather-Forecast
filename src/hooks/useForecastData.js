import {useEffect, useState} from "react";
import {monthData, toCelsius, weekData} from "../helpers/index.js";

const useForecastData = (weatherData, promptData, isWeekly) => {

    const [forecastData, setForecastData] = useState([]);
    const [dailyData, setDailyData] = useState({
        locationString: "введите город",
        temp: 273,
        description: "--",
        minTemp: 273,
        maxTemp: 273
    })

    const [weatherDetails, setWeatherDetails] = useState({})

    useEffect(() => {
        if (!weatherData?.daily) return;

        setDailyData({
            locationString: promptData?.locationString,
            temp: weatherData?.current?.temp,
            description: weatherData?.current?.weather[0].description,
            minTemp: weatherData?.daily[0].temp.min,
            maxTemp: weatherData?.daily[0].temp.max,
        })

        setWeatherDetails({uv: weatherData?.current?.uvi})

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
    }, [weatherData, promptData, isWeekly]);

    return [dailyData, forecastData, weatherDetails];

}

export default useForecastData;