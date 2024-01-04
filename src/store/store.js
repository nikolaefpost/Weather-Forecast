import { configureStore } from '@reduxjs/toolkit';
import locationReducer from '../features/location/locationSlice';
import weatherReducer from '../features/weather/weatherSlice.js'

const store = configureStore({
    reducer: {
        location: locationReducer,
        weather: weatherReducer
        // Другие срезы состояния могут быть добавлены здесь
    },
});

export default store