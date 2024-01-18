import {useEffect, useState} from "react";
import {useLanguage} from "../context/index.js";

const useSetting = () => {
    const { text } = useLanguage();

    const [settingsData, setSettingsData] = useState({})

    // useEffect(() => {
    //     const settingsDataStorage = JSON.parse(localStorage.getItem("settings"));
    //     if (settingsDataStorage) setSettingsData(settingsDataStorage);
    // }, []);

    useEffect(() => {
        const settingsDataStorage = JSON.parse(localStorage.getItem("settings"));
        if (settingsDataStorage) setSettingsData(settingsDataStorage);
        else setSettingsData({
            uvi: {value: true, label: text.uv_index},
            sunrise: {value: true, label: text.sunrise},
            wind: {value: true, label: text.wind},
            feelsLike: {value: true, label: text.feels_like},
            humidity: {value: true, label: text.humidity},
            visibility: {value: true, label: text.visibility},
            pressure: {value: true, label: text.pressure},
        })
    }, [text])

    return {settingsData, setSettingsData}
}

export default useSetting

