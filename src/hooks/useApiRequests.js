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
    console.log(prompt)
    // Fetch location and weather data from API.
    useEffect(() => {
        console.log(prompt)
        const fetchData = async () => {
            if (!prompt) return; // return if prompt is null or undefined
            dispatch(getLocationStart());
            try {
                const promptDataRes = await promptToLocation(prompt);
                dispatch(setCity(promptDataRes.locationString));

                const locationDataRes = await locationToCoordinates(
                    promptDataRes.locationString
                );
                dispatch(getLocationSuccess({ latitude: locationDataRes.lat, longitude: locationDataRes.lon }));
            } catch (error) {
                setError(error);
                dispatch(getLocationFailure(error));
                console.error("Error:", error);
            }
        };

        fetchData();

    }, [prompt, dispatch]); // run effect when `prompt` changes
    return {
        error,
    };
};






const useApiWeather = () => {
    const dispatch = useDispatch();

    const current = JSON.parse(localStorage.getItem('current'));

    if (current?.locationString){
        dispatch(getLocationSuccess({ latitude: current.lat, longitude: current.lon }));
        dispatch(setCity(current.locationString));
    }

    const { latitude, longitude, city } = useSelector((state) => state.location);
    const [error, setError] = useState(null);

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
    };
};



useApiPromptRequests.propTypes = {
    prompt: PropTypes.string.isRequired,
};





export {useApiWeather, useApiPromptRequests}