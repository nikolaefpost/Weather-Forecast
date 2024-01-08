import PropTypes from "prop-types";

// Fetch location data from OpenWeatherMap API.
const locationToCoordinates = async (locationString) => {

    const coordinatesData = JSON.parse(localStorage.getItem(locationString));
    if (coordinatesData?.length)  return coordinatesData

    try {
        const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${locationString}&limit=1&APPID=${
                import.meta.env.VITE_OWM}`
        );
        const locationData = await response.json();
        if (locationData.length === 0) {
            throw new Error("No location by that name. Try again.");
        }

        const dataResult = {
            locationString: locationString,
            lat: locationData[0].lat,
            lon: locationData[0].lon
        }
        localStorage.setItem(locationString, JSON.stringify(dataResult));
        localStorage.setItem("current", JSON.stringify(dataResult));
        return dataResult;
    } catch (error) {
        console.error("Error:", error);
        return await Promise.reject(error);
    }
};

locationToCoordinates.propTypes = {
    location: PropTypes.string.isRequired,
};

export default locationToCoordinates;