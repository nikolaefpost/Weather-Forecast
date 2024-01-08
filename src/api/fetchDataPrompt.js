import {getLocationFailure, getLocationStart, getLocationSuccess, setCity} from "../features/location/locationSlice.js";
import promptToLocation from "./promtToLocation.js";
import locationToCoordinates from "./locationToCoordinates.js";


const fetchDataPrompt = async (prompt, dispatch) => {
    if (!prompt) return; // return if prompt is null or undefined
    dispatch(getLocationStart());
    try {
        const promptDataRes = await promptToLocation(prompt);
        dispatch(setCity(promptDataRes.locationString));

        const locationDataRes = await locationToCoordinates(
            promptDataRes.locationString
        );
        dispatch(getLocationSuccess({ latitude: locationDataRes.lat, longitude: locationDataRes.lon }));
    } catch (error) {
        // setError(error);
        dispatch(getLocationFailure(error));
        console.error("Error:", error);
    }
};

export default fetchDataPrompt;