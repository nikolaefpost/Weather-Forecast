import {useEffect, useState} from "react";
import promptToLocation from "../api/promtToLocation.js";
import locationToCoordinates from "../api/locationToCoordinates.js";
import PropTypes from "prop-types";
import {useSelector, useDispatch} from "react-redux";
import { getLocationStart, getLocationSuccess, getLocationFailure, setCity } from '../features/location/locationSlice.js';
import { setWeatherData } from '../features/weather/weatherSlice.js'


const useApiPromptRequests = (prompt) => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    console.log("Prompt");
    // Fetch location and weather data from API.
    useEffect(() => {
        const fetchData = async () => {
            if (!prompt) return; // return if prompt is null or undefined
            dispatch(getLocationStart());
            try {
                const promptDataRes = await promptToLocation(prompt);
                dispatch(setCity(promptDataRes.locationString));
                console.log(promptDataRes.locationString)
                // setPromptData(promptDataRes.locationString);

                const locationDataRes = await locationToCoordinates(
                    promptDataRes.locationString
                );
                console.log(locationDataRes)
                dispatch(getLocationSuccess({ latitude: locationDataRes[0].lat, longitude: locationDataRes[0].lon }));


                // setLocationData(locationDataRes);

                // const weatherDataRes = await getWeatherData(locationDataRes);
                // setWeatherData(weatherDataRes);

                // const weatherDescriptRes = await WeatherDescript(
                //     prompt,
                //     weatherDataRes
                // );
                // setWeatherDescription(weatherDescriptRes);
            } catch (error) {
                setError(error);
                dispatch(getLocationFailure('Geolocation is not supported by your browser'));
                console.error("Error:", error);
            }
        };

        fetchData();

    }, [prompt]); // run effect when `prompt` changes
    return {
        error,
        // weatherDescription
    };
};



const useApiWeather = () => {
    const dispatch = useDispatch();
    const { latitude, longitude, city } = useSelector((state) => state.location);
    const [error, setError] = useState(null);

    // const [weatherData, setWeatherData] = useState({});
    // const [weatherDescription, setWeatherDescription] = useState(null);
    console.log("API");
    // Fetch location and weather data from API.
    useEffect(() => {
        const fetchData = async () => {
            if (!city || !latitude) return; // return if prompt is null or undefined

            try {
                // Dispatch the asynchronous action
                await dispatch(setWeatherData(latitude, longitude));
            } catch (error) {
                setError(error);
                console.error("Error:", error);
            }
        };

        fetchData();
    }, [city, latitude, longitude]); // run effect when `prompt` changes

    return {
        error,
        // weatherData,
        // weatherDescription
    };
};



useApiPromptRequests.propTypes = {
    prompt: PropTypes.string.isRequired,
};





export {useApiWeather, useApiPromptRequests}