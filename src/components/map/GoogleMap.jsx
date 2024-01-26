import {useEffect, useState} from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow
} from "@vis.gl/react-google-maps";
import {useDispatch} from "react-redux";
import {getLocationSuccess} from "../../features/location/locationSlice.js";
import {getCityName} from "../../api/getCityName.js";
import PropTypes from "prop-types";
import {useLanguage} from "../../context/index.js";

import styles from "./map.module.scss";


const GoogleMap = ({setIsSetting}) => {
    const dispatch = useDispatch();
    const { lang } = useLanguage();

    const [markerPosition, setMarkerPosition] = useState({lat: 0, lng: 0});
    const [centerPosition, setCenterPosition] = useState({lat: 0, lng: 0});
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [infoStatus, setInfoStatus] = useState("Loading");

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
                getCityName(event.detail.latLng.lat, event.detail.latLng.lng, lang, dispatch);
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

    useEffect(() => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCenterPosition({lat: position.coords.latitude, lng: position.coords.longitude});
                },
                (error) => {
                    setInfoStatus(error.message);
                }
            );
            setLoading(false)
        } else {
            setInfoStatus('Geolocation is not supported by your browser');
        }

    }, []);




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
                {/*{markerPosition.lat !== 0 && <button onClick={handleAddNewPlace}>{text.add_place}</button>}*/}
            </div>
        </APIProvider>
    );
};

GoogleMap.propTypes = {
    setIsSetting: PropTypes.func.isRequired,
};

export default GoogleMap;
