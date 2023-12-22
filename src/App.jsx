// import {useState} from 'react'
import styles from './App.module.scss'
import {DailyBasic, DailyBasicShort, AllInformation} from "./components";
import useApiRequests from "./hooks/useApiRequests.js";
import { useState} from "react";
import useForecastData from "./hooks/useForecastData.js";




function App() {
    const promt = "Odesa";
    const [isWeekly, setIsWeekly]= useState(false)
    const [blockHeight, setBlockHeight] = useState(325);
    const screenHeight = window.screen.height;

    const handleTouchMove = (e) => {
        const newHeight = screenHeight - e.touches[0].clientY; // Adjust sensitivity as needed
        setBlockHeight(Math.max(325, newHeight)); // Ensure a minimum height
    };

    const {error, promptData, locationData, weatherData} = useApiRequests(promt);
    console.log(weatherData)

    const [dailyData, forecastData, weatherDetails] = useForecastData(weatherData, promptData, isWeekly)

    return (
        <div
            className={styles.container}
        >
            <div
                className={styles.content}
                style={{paddingTop: (blockHeight > 350)?"52px" : "98px"}}
            >
                <div className={styles.house}/>
                <div className={styles.shadow}/>
                {(blockHeight > 350)? <DailyBasicShort {...dailyData}/> : <DailyBasic {...dailyData}/>}
                <AllInformation
                    forecastData={forecastData}
                    weatherDetails={weatherDetails}
                    isWeekly={isWeekly}
                    setIsWeekly={setIsWeekly}
                    height={blockHeight}
                    handleTouchMove={handleTouchMove}
                />
            </div>

        </div>
    )
}

export default App
