import { createSlice } from '@reduxjs/toolkit';
import promptToLocation from "../../api/promtToLocation.js";
import locationToCoordinates from "../../api/locationToCoordinates.js";

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        latitude: null,
        longitude: null,
        loading: false,
        error: null,
        city: "",
    },
    reducers: {
        getLocationStart: (state) => {
            state.loading = true;
        },
        getLocationEnd: (state) => {
            state.loading = false;
        },
        getLocationSuccess: (state, action) => {
            state.latitude = action.payload.latitude;
            state.longitude = action.payload.longitude;
        },
        getLocationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.message || JSON.stringify(action.payload);
        },
        getResetError: (state) => {
            state.error = null;
        },
        setCity: (state, action) => {
            state.city = action.payload;
        },
    },
});

export const {
    getLocationStart,
    getLocationEnd,
    getLocationSuccess,
    getLocationFailure,
    getResetError,
    setCity
} = locationSlice.actions;

export const fetchDataPrompt = (prompt, lang) => async (dispatch) =>{
    if (!prompt) return; // return if prompt is null or undefined
    dispatch(getLocationStart());
    try {
        const promptDataRes = await promptToLocation(prompt, lang);
        dispatch(setCity(promptDataRes.locationString));

        const locationDataRes = await locationToCoordinates(
            promptDataRes.locationString
        );
        if (locationDataRes) dispatch(getLocationSuccess({ latitude: locationDataRes.lat, longitude: locationDataRes.lon }));
        dispatch(getLocationEnd());
    } catch (error) {
        // setError(error);
        dispatch(getLocationFailure(error));
        console.error("Error:", error);
    }
};

export const getCityName =  (lat, lon, lang) => async(dispatch)=> {

    const language = lang === 'en'? lang: "uk";
    try {
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${import.meta.env.VITE_GEO}&language=${language}`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const cityName = data.results[0].components.city? data.results[0].components.city: data.results[0].components.town
            const city = cityName + ", " + data.results[0].components['ISO_3166-1_alpha-2'];
            localStorage.setItem("current", JSON.stringify({
                locationString: city,
                lat,
                lon
            }));
            dispatch(setCity(city));
        } else {
            dispatch(setCity(JSON.stringify(data.results)));
        }
    } catch (error) {
        console.error('Error fetching city:', error);
    }
};

export default locationSlice.reducer;