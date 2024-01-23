import { useState} from 'react';
import {AllInformation, Daily, SearchCity, Settings, GoogleMap} from "./components";
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
    const [isSearchOnMap, setIsSearchOnMap] = useState(false)
    const screenHeight = window.screen.height;

    const {  city, loading, error} = useSelector((state) => state.location);
    const { weatherData } = useSelector((state) => state.weather);


    const onHandleMapSearch = () => {
        if (isSetting) setIsSetting(false);
        if (isSearch) setIsSearch(false);
            setIsSearchOnMap(pre=>!pre)
    }

    const {settingsData, setSettingsData} = useSetting();

    const onHandleSearchToggle = () => {
        if (isSetting) setIsSetting(false);
        if (isSearchOnMap) setIsSearchOnMap(false);
        setIsSearch(pre => !pre)
    }
    const onHandleSettingToggle = () => {
        if (isSearchOnMap) setIsSearchOnMap(false);
        if (isSearch) setIsSearch(false);
        setIsSetting(pre => !pre)
    };

    const handleTouchMove = (e) => {
        if (isSetting) setIsSetting(false);
        let newHeight = screenHeight - e.touches[0].clientY; // Adjust sensitivity as needed
        if (newHeight > screenHeight-250){
            newHeight = screenHeight-250;
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
            style={{paddingTop: (blockHeight > 350)?"16px" : "98px"}}
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
            {isSearchOnMap && <GoogleMap setIsSetting={setIsSearchOnMap}/>}
            <AllInformation
                forecastData={forecastData}
                weatherDetails={weatherDetails}
                isWeekly={isWeekly}
                setIsWeekly={setIsWeekly}
                height={blockHeight}
                handleTouchMove={handleTouchMove}
                detailsOn={detailsOn}
                onHandleSearchToggle={onHandleSearchToggle}
                onHandleSettingToggle={onHandleSettingToggle}
                settingsData={settingsData}
                onHandleMapSearch={onHandleMapSearch}
            />
        </div>
    );
};




export default Layout;