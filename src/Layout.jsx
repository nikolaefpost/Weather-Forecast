import  {useState} from 'react';
import {AllInformation, DailyBasic, DailyBasicShort} from "./components/index.js";
import useForecastData from "./hooks/useForecastData.js";

import styles from "./App.module.scss";
import PropTypes from "prop-types";

const Layout = ({weatherData, promptData}) => {
    const [isWeekly, setIsWeekly]= useState(false)
    const [blockHeight, setBlockHeight] = useState(325);
    const screenHeight = window.screen.height;


    const handleTouchMove = (e) => {
        let newHeight = screenHeight - e.touches[0].clientY; // Adjust sensitivity as needed
        newHeight = newHeight > screenHeight-150 ? screenHeight-150:newHeight;
        setBlockHeight(Math.max(325, newHeight)); // Ensure a minimum height
    };


    const [dailyData, forecastData, weatherDetails] = useForecastData(weatherData, promptData, isWeekly)

    return (
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
    );
};

Layout.propTypes = {
    weatherData: PropTypes.object.isRequired,
    promptData: PropTypes.object.isRequired,
};


export default Layout;