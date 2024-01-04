import  {useState} from 'react';
import {AllInformation, DailyBasic, DailyBasicShort} from "./components/index.js";
import useForecastData from "./hooks/useForecastData.js";

import styles from "./App.module.scss";
import {useSelector} from "react-redux";


const Layout = () => {

    const [isWeekly, setIsWeekly]= useState(false)
    const [blockHeight, setBlockHeight] = useState(325);
    const [detailsOn, setDetailsOn] = useState(false)
    const screenHeight = window.screen.height;

    const {  city, loading, error} = useSelector((state) => state.location);
    const { weatherData } = useSelector((state) => state.weather);

    const handleTouchMove = (e) => {
        let newHeight = screenHeight - e.touches[0].clientY; // Adjust sensitivity as needed
        if (newHeight > screenHeight-200){
            newHeight = screenHeight-200;
            setDetailsOn(true)
        }else {
            setDetailsOn(false)
        }
        // newHeight = newHeight > screenHeight-200 ? screenHeight-200:newHeight;
        setBlockHeight(Math.max(325, newHeight)); // Ensure a minimum height
    };


    const [dailyData, forecastData, weatherDetails] = useForecastData(weatherData, city, isWeekly)

    return (
        <div
            className={styles.content}
            style={{paddingTop: (blockHeight > 350)?"32px" : "98px"}}
        >
            <div className={styles.house}/>
            <div className={styles.shadow}/>
            {(blockHeight > 350 )? <DailyBasicShort {...dailyData} loading={loading} /> : <DailyBasic {...dailyData} loading={loading}/>}
            <AllInformation
                forecastData={forecastData}
                weatherDetails={weatherDetails}
                isWeekly={isWeekly}
                setIsWeekly={setIsWeekly}
                height={blockHeight}
                handleTouchMove={handleTouchMove}
                detailsOn={detailsOn}
            />
        </div>
    );
};




export default Layout;