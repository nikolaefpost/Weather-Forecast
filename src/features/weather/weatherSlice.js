import { createSlice } from '@reduxjs/toolkit';
import getWeatherData from "../../api/getWeatherData.js";

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        weatherData: null,
        errorWeather: null
    },
    reducers: {
        setWeatherDataSuccess: (state, action) => {
            state.weatherData = action.payload;
        },
    },
});

export const { setWeatherDataSuccess } = weatherSlice.actions;

export const setWeatherData = (latitude, longitude, lang) => async (dispatch) => {
    const weatherDataRes = await getWeatherData(latitude, longitude, lang);
    dispatch(setWeatherDataSuccess(weatherDataRes));
};

export default weatherSlice.reducer;