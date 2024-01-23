import {useEffect, useState} from "react";
import {useLanguage} from "../context/index.js";

const useSetting = () => {
    const { text } = useLanguage();

    const [settingsData, setSettingsData] = useState({
        uvi: {value: true, label: text.uv_index},
        sunrise: {value: true, label: text.sunrise},
        wind: {value: true, label: text.wind},
        feelsLike: {value: true, label: text.feels_like},
        humidity: {value: true, label: text.humidity},
        visibility: {value: true, label: text.visibility},
        pressure: {value: true, label: text.pressure},
    })

    // useEffect(() => {
    //     const settingsDataStorage = JSON.parse(localStorage.getItem("settings"));
    //     if (settingsDataStorage) setSettingsData(settingsDataStorage);
    // }, []);

    useEffect(() => {
        const settingsDataStorage = JSON.parse(localStorage.getItem("settings"));
        if (settingsDataStorage) setSettingsData(settingsDataStorage);
    }, [])

    useEffect(() => {
        setSettingsData((prevSettingsData) => ({
            ...prevSettingsData,
            uvi: { ...prevSettingsData.uvi, label: text.uv_index },
            sunrise: { ...prevSettingsData.sunrise, label: text.sunrise },
            wind: { ...prevSettingsData.wind, label: text.wind },
            feelsLike: { ...prevSettingsData.feelsLike, label: text.feels_like },
            humidity: { ...prevSettingsData.humidity, label: text.humidity },
            visibility: { ...prevSettingsData.visibility, label: text.visibility },
            pressure: { ...prevSettingsData.pressure, label: text.pressure },
        }));
    }, [text]);

    return {settingsData, setSettingsData}
}

export default useSetting

