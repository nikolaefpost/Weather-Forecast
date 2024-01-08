import {setCity} from "../features/location/locationSlice.js";

export const getCityName = async (lat, lon, dispatch) => {

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
            dispatch(setCity(city));
        } else {
            dispatch(setCity(JSON.stringify(data.results)));
        }
    } catch (error) {
        console.error('Error fetching city:', error);
    }
};