import  {useState} from 'react';
import {AllInformation, Daily, SearchCity} from "./components";
import useForecastData from "./hooks/useForecastData.js";

import styles from "./App.module.scss";
import {useSelector} from "react-redux";


const Layout = () => {

    const [isWeekly, setIsWeekly]= useState(false)
    const [blockHeight, setBlockHeight] = useState(325);
    const [detailsOn, setDetailsOn] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const screenHeight = window.screen.height;

    const {  city, loading, error} = useSelector((state) => state.location);
    const { weatherData } = useSelector((state) => state.weather);

    const onHandleSearch = () => setIsSearch(true)

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
            {!isSearch?<Daily blockHeight={blockHeight} dailyData={dailyData} loading={loading}/>:<SearchCity setIsSearch={setIsSearch}/>}
            <AllInformation
                forecastData={forecastData}
                weatherDetails={weatherDetails}
                isWeekly={isWeekly}
                setIsWeekly={setIsWeekly}
                height={blockHeight}
                handleTouchMove={handleTouchMove}
                detailsOn={detailsOn}
                onHandleSearch={onHandleSearch}
            />
        </div>
    );
};




export default Layout;