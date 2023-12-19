// import {useState} from 'react'
import styles from './App.module.scss'
import {DailyBasic} from "./components/index.js";
import AllInformation from "./components/allInformation/AllInformation.jsx";
import useApiRequests from "./hooks/useApiRequests.js";
import {useEffect, useState} from "react";
import {toCelsius, weekData} from "./helpers";

const monthData =["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]


function App() {
    const promt = "Odesa";
    const [isWeekly, setIsWeekly]= useState(false)
    const [dailyData, setDailyData] = useState({
        locationString: "введите город",
        temp: 273,
        description: "--",
        minTemp: 273,
        maxTemp: 273
    })
    const [forecastData, setForecastData] = useState([])


    const {error, promptData, locationData, weatherData} =
        useApiRequests(promt);

    useEffect(() => {
        if (!weatherData?.daily) return;
        setDailyData({
            locationString: promptData?.locationString,
            temp: weatherData?.current?.temp,
            description: weatherData?.current?.weather[0].description,
            minTemp: weatherData?.daily[0].temp.min,
            maxTemp: weatherData?.daily[0].temp.max,
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
        console.log(weekly)
        setForecastData(isWeekly? weekly: hourly);
    }, [weatherData, promptData, isWeekly]);
    console.log(weatherData)

    return (
        <div
            className={styles.container}
        >
            <div className={styles.content}>
                <div className={styles.house}/>
                <div className={styles.shadow}/>
                <DailyBasic {...dailyData}/>
                <AllInformation forecastData={forecastData} isWeekly={isWeekly} setIsWeekly={setIsWeekly} />
            </div>

        </div>
    )
}

export default App
