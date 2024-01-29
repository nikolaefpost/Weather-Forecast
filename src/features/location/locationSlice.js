import { createSlice } from '@reduxjs/toolkit';

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
        getLocationSuccess: (state, action) => {
            state.loading = false;
            state.latitude = action.payload.latitude;
            state.longitude = action.payload.longitude;
        },
        getLocationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.message || JSON.stringify(action.payload);
        },
        setCity: (state, action) => {
            state.city = action.payload;
        },
    },
});

export const { getLocationStart, getLocationSuccess, getLocationFailure, setCity } = locationSlice.actions;

export default locationSlice.reducer;