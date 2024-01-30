import PropTypes from "prop-types";

// Fetch weather data from OpenWeatherMap API.
const getWeatherData = async (latitude, longitude,lang) => {

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${
                latitude
            }&lon=${longitude}&APPID=${import.meta.env.VITE_OWM}&lang=${lang}`
        );
        return await response.json();
    } catch (error) {
        throw "Unable to fetch weather data. Try again";
    }
};

getWeatherData.propTypes = {
    locationData: PropTypes.string.isRequired,
};

export default getWeatherData;