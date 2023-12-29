import { combineReducers } from '@reduxjs/toolkit';
import locationReducer from '../features/location/locationSlice';

const rootReducer = combineReducers({
    location: locationReducer,
    // Другие срезы состояния могут быть добавлены здесь
});

export default rootReducer;