
// import { useDispatch } from 'react-redux';
// import { getLocationStart, getLocationSuccess, getLocationFailure } from '../../../features/location/locationSlice.js';
import {point} from "../../../assets/image";
import PropTypes from "prop-types";
// import {getCityName} from "../../../api/getCityName.js";

const LocationComponent = ({onHandleMapSearch}) => {
    // const dispatch = useDispatch();
    //
    // const handleGetLocation = () => {
    //     dispatch(getLocationStart());
    //
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 dispatch(getLocationSuccess({ latitude: position.coords.latitude, longitude: position.coords.longitude }));
    //                 getCityName(position.coords.latitude, position.coords.longitude, dispatch);
    //             },
    //             (error) => {
    //                 dispatch(getLocationFailure(error.message));
    //             }
    //         );
    //     } else {
    //         dispatch(getLocationFailure('Geolocation is not supported by your browser'));
    //     }
    // };



    return <input onClick={onHandleMapSearch} type="image" src={ point } alt="point"/>;
};

LocationComponent.propTypes = {
    onHandleMapSearch: PropTypes.func.isRequired,
};

export default LocationComponent;