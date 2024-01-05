
import { useDispatch } from 'react-redux';
import { getLocationStart, getLocationSuccess, getLocationFailure, setCity } from '../../../features/location/locationSlice.js';
import {point} from "../../../assets/image";

const LocationComponent = () => {
    const dispatch = useDispatch();

    const handleGetLocation = () => {
        dispatch(getLocationStart());

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    dispatch(getLocationSuccess({ latitude: position.coords.latitude, longitude: position.coords.longitude }));
                    getCityName(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    dispatch(getLocationFailure(error.message));
                }
            );
        } else {
            dispatch(getLocationFailure('Geolocation is not supported by your browser'));
        }
    };

    const getCityName = async (lat, lon) => {

        try {
            const language = 'en';
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${import.meta.env.VITE_GEO}&language=${language}`);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const city = data.results[0].components.city+ ", " + data.results[0].components['ISO_3166-1_alpha-2'];
                localStorage.setItem("current", JSON.stringify({
                    locationString: city,
                    lat,
                    lon
                }));
                console.log(data.results)
                dispatch(setCity(city));
            } else {
                dispatch(setCity(JSON.stringify(data)));
            }
        } catch (error) {
            console.error('Error fetching city:', error);
        }
    };

    return (<input onClick={handleGetLocation} type="image" src={point} alt="point"/>
        // <div>
        //     <button onClick={handleGetLocation}>Получить координаты и город</button>
        //     {loading && <p>Определение местоположения...</p>}
        //     {latitude !== null && longitude !== null && (
        //         <p>
        //             Ваши координаты: Широта {latitude}, Долгота {longitude}
        //         </p>
        //     )}
        //     {city && <p>Ваш город: {city}</p>}
        //     {error && <p>Ошибка при получении местоположения: {error}</p>}
        // </div>
    );
};

export default LocationComponent;