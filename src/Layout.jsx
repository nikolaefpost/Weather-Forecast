import { useState} from 'react';
import {AllInformation, Daily, SearchCity, Settings} from "./components";
import useForecastData from "./hooks/useForecastData.js";
import {useSelector} from "react-redux";
import useSetting from "./hooks/useSetting.js";

import styles from "./App.module.scss";


const Layout = () => {

    const [isWeekly, setIsWeekly]= useState(false)
    const [blockHeight, setBlockHeight] = useState(325);
    const [detailsOn, setDetailsOn] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [isSetting, setIsSetting] = useState(false);
    const screenHeight = window.screen.height;

    const {  city, loading, error} = useSelector((state) => state.location);
    const { weatherData } = useSelector((state) => state.weather);

    const {settingsData, setSettingsData} = useSetting();

    const onHandleSearch = () => setIsSearch(true)
    const onHandleSettingToggle = () => setIsSetting(pre=>!pre);

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
            {!isSearch && !isSetting && <Daily blockHeight={blockHeight} dailyData={dailyData} loading={loading}/>}
            {isSearch && <SearchCity setIsSearch={setIsSearch}/>}
            {isSetting && <Settings
                setIsSetting={setIsSetting}
                setSettingsData={setSettingsData}
                settingsData={settingsData}
            />}
            <AllInformation
                forecastData={forecastData}
                weatherDetails={weatherDetails}
                isWeekly={isWeekly}
                setIsWeekly={setIsWeekly}
                height={blockHeight}
                handleTouchMove={handleTouchMove}
                detailsOn={detailsOn}
                onHandleSearch={onHandleSearch}
                onHandleSettingToggle={onHandleSettingToggle}
                settingsData={settingsData}
            />
        </div>
    );
};




export default Layout;