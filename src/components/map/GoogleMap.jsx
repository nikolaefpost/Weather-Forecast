import {useEffect, useState} from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow
} from "@vis.gl/react-google-maps";
import {useDispatch, useSelector} from "react-redux";
import {getCityName, getLocationSuccess} from "../../features/location/locationSlice.js";
import PropTypes from "prop-types";
import {useLanguage} from "../../context/index.js";
import {currentLocationIcon} from "../../assets/svgElement";

import styles from "./map.module.scss";



const GoogleMap = ({setIsSetting}) => {
    const dispatch = useDispatch();
    const { lang } = useLanguage();

    const [markerPosition, setMarkerPosition] = useState({lat: 0, lng: 0});
    const [centerPosition, setCenterPosition] = useState({lat: 0, lng: 0});
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [infoStatus, setInfoStatus] = useState("Loading");
    const { latitude, longitude } = useSelector((state) => state.location);
    const handleMarkerClick = () => {
        setOpen(true);
    };

    const handleMapClick = (event) => {
        if (event && event.detail && event.detail.latLng) {
            setMarkerPosition({
                lat: event.detail.latLng.lat,
                lng: event.detail.latLng.lng
            });

            // Close the InfoWindow when the map is clicked
            setOpen(false);

            setTimeout(()=>{
                dispatch(getLocationSuccess({
                    latitude: event.detail.latLng.lat,
                    longitude: event.detail.latLng.lng
                }));
                dispatch(getCityName(event.detail.latLng.lat, event.detail.latLng.lng, lang));
                setIsSetting(false);
            },2000)
        }
    };

    // const handleAddNewPlace = () => {
    //     dispatch(getLocationSuccess({
    //         latitude: markerPosition.lat,
    //         longitude: markerPosition.lng
    //     }));
    //     getCityName(markerPosition.lat, markerPosition.lng, lang, dispatch);
    //     setIsSetting(false);
    // }
    
    const handleCurrentPosition = () => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCenterPosition({lat: position.coords.latitude, lng: position.coords.longitude});
                    setMarkerPosition({lat: position.coords.latitude, lng: position.coords.longitude})

                    setTimeout(()=>{
                        dispatch(getLocationSuccess({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }));
                        dispatch(getCityName(position.coords.latitude, position.coords.longitude, lang));
                        setIsSetting(false);
                    },2000)
                },
                (error) => {
                    setInfoStatus(error.message);
                }
            );
            setLoading(false)
        } else {
            setInfoStatus('Geolocation is not supported by your browser');
        }

    }

    // useEffect(() => {
    //     setLoading(true);
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 setCenterPosition({lat: position.coords.latitude, lng: position.coords.longitude});
    //             },
    //             (error) => {
    //                 setInfoStatus(error.message);
    //             }
    //         );
    //         setLoading(false)
    //     } else {
    //         setInfoStatus('Geolocation is not supported by your browser');
    //     }
    //
    // }, []);

    useEffect(() => {
        if(latitude){
            setCenterPosition({lat: latitude, lng: longitude});
            setMarkerPosition({lat: latitude, lng: longitude});
        }

    }, [latitude, longitude]);




    return (
        <APIProvider apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}>
            <div className={styles.map}>
                {loading ? <p>{infoStatus}</p> : <Map
                    zoom={5}
                    center={centerPosition}
                    streetViewControl={false}
                    zoomControl={false}
                    mapTypeControl={false}
                    mapId={import.meta.env.VITE_APP_GOOGLE_MAP_ID}
                    onClick={handleMapClick}
                >
                    <AdvancedMarker position={markerPosition} onClick={handleMarkerClick}>
                        <Pin
                            background={"#e64395"}
                            borderColor={"#3658b1"}
                            glyphColor={"#3658b1"}
                        />
                    </AdvancedMarker>

                    <InfoWindow
                        latitude={markerPosition.lat}
                        longitude={markerPosition.lng}
                        onClose={() => setOpen(false)}
                        isVisible={open}
                    >
                        {/* Content of the InfoWindow */}
                        <div >
                            <h3>Marker Information</h3>
                            <p>Latitude: {markerPosition.lat}</p>
                            <p>Longitude: {markerPosition.lng}</p>
                        </div>
                    </InfoWindow>
                </Map>}
                <button onClick={handleCurrentPosition}><img src={currentLocationIcon} alt="location" /></button>
            </div>
        </APIProvider>
    );
};

GoogleMap.propTypes = {
    setIsSetting: PropTypes.func.isRequired,
};

export default GoogleMap;
