// import {getLocationFailure, getLocationStart, getLocationEnd, getLocationSuccess, setCity} from "../features/location/locationSlice.js";
// import promptToLocation from "./promtToLocation.js";
// import locationToCoordinates from "./locationToCoordinates.js";
//
//
// const fetchDataPrompt = async (prompt, lang, dispatch) => {
//     if (!prompt) return; // return if prompt is null or undefined
//     dispatch(getLocationStart());
//     try {
//         const promptDataRes = await promptToLocation(prompt, lang);
//         dispatch(setCity(promptDataRes.locationString));
//
//         const locationDataRes = await locationToCoordinates(
//             promptDataRes.locationString
//         );
//         if (locationDataRes) dispatch(getLocationSuccess({ latitude: locationDataRes.lat, longitude: locationDataRes.lon }));
//         dispatch(getLocationEnd());
//     } catch (error) {
//         // setError(error);
//         dispatch(getLocationFailure(error));
//         console.error("Error:", error);
//     }
// };
//
// export default fetchDataPrompt;