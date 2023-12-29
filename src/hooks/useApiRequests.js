import {useEffect, useState} from "react";
import promptToLocation from "../api/promtToLocation.js";
import locationToCoordinates from "../api/locationToCoordinates.js";
import getWeatherData from "../api/getWeatherData.js";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
const useApiRequests = () => {
    const { latitude, longitude, loading, errorS, city } = useSelector((state) => state.location);
    const [error, setError] = useState(null);
    const [promptData, setPromptData] = useState({});
    const [locationData, setLocationData] = useState([]);
    const [weatherData, setWeatherData] = useState({});
    // const [weatherDescription, setWeatherDescription] = useState(null);
    console.log("API");
    // Fetch location and weather data from API.
    useEffect(() => {
        const fetchData = async () => {
            if (!city) return; // return if prompt is null or undefined

            try {
                const promptDataRes = await promptToLocation(city);
                setPromptData(promptDataRes);

                const locationDataRes = await locationToCoordinates(
                    promptDataRes.locationString
                );
                setLocationData(locationDataRes);

                const weatherDataRes = await getWeatherData(locationDataRes);
                setWeatherData(weatherDataRes);

                // const weatherDescriptRes = await WeatherDescript(
                //     prompt,
                //     weatherDataRes
                // );
                // setWeatherDescription(weatherDescriptRes);
            } catch (error) {
                setError(error);
                console.error("Error:", error);
            }
        };

        fetchData();
    }, [city]); // run effect when `prompt` changes

    return {
        error,
        promptData,
        locationData,
        weatherData,
        // weatherDescription
    };
};

useApiRequests.propTypes = {
    prompt: PropTypes.string.isRequired,
};

export default useApiRequests