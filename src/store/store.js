import { configureStore } from '@reduxjs/toolkit';
import locationReducer from '../features/location/locationSlice';

const store = configureStore({
    reducer: {
        location: locationReducer,
        // Другие срезы состояния могут быть добавлены здесь
    },
});

export default store