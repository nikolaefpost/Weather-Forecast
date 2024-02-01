import { createSlice } from '@reduxjs/toolkit';
import getWeatherData from "../../api/getWeatherData.js";
import getWeatherDescription from "../../api/getWeatherDescript.js";

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        weatherData: null,
        descriptionData: '',
        errorWeather: null,

    },
    reducers: {
        setWeatherDataSuccess: (state, action) => {
            state.weatherData = action.payload;
        },
        setDescriptionWeatherDataSuccess: (state, action) => {
            state.descriptionData = action.payload;
        },
        deleteDescriptionWeather: (state) => {
            state.descriptionData = "";
        },
    },
});

export const { setWeatherDataSuccess, setDescriptionWeatherDataSuccess,  deleteDescriptionWeather} = weatherSlice.actions;

export const setWeatherData = (latitude, longitude, prompt, lang) => async (dispatch) => {
    console.log("START")
    dispatch(deleteDescriptionWeather());
    const weatherDataRes = await getWeatherData(latitude, longitude, lang);
    dispatch(setWeatherDataSuccess(weatherDataRes));
    const descriptionDataRes = await getWeatherDescription(prompt, weatherDataRes.current, lang);
    dispatch(setDescriptionWeatherDataSuccess(descriptionDataRes));
};

// export const setDescriptionWeatherData = (prompt, weatherData, lang) => async (dispatch) => {
//     const descriptionDataRes = await getWeatherDescription(prompt, weatherData, lang);
//     dispatch(setDescriptionWeatherDataSuccess(descriptionDataRes));
// };

export default weatherSlice.reducer;