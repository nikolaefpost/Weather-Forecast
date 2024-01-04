import { createSlice } from '@reduxjs/toolkit';
import getWeatherData from "../../api/getWeatherData.js";

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        weatherData: null
    },
    reducers: {
        setWeatherDataSuccess: (state, action) => {
            state.weatherData = action.payload;
        },
    },
});

export const { setWeatherDataSuccess } = weatherSlice.actions;

export const setWeatherData = (latitude, longitude) => async (dispatch) => {
    try {
        const weatherDataRes = await getWeatherData(latitude, longitude);
        dispatch(setWeatherDataSuccess(weatherDataRes));
    } catch (error) {
        console.error("Error:", error);
        // Handle error as needed
    }
};

export default weatherSlice.reducer;