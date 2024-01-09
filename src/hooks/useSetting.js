import {useEffect, useState} from "react";

const useSetting = () => {
    const [settingsData, setSettingsData] = useState({
        uvi: true,
        sunrise: true,
        wind: true,
        feelsLike: true,
        humidity: true,
        visibility: true,
        pressure: true,
    })

    useEffect(() => {
        const settingsDataStorage = JSON.parse(localStorage.getItem("settings"));
        if (settingsDataStorage) setSettingsData(settingsDataStorage);
    }, []);

    return {settingsData, setSettingsData}
}

export default useSetting

