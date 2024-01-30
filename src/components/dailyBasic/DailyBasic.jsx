import {firstLetterCapitalized, toCelsius} from "../../helpers/index.js";
import PropTypes from "prop-types";
import Error from "../error/Error.jsx";
import {useLanguage} from "../../context/index.js";
import {useDispatch} from "react-redux";
import {getResetError} from "../../features/location/locationSlice.js";

import styles from "./dailyBasic.module.scss";

const DailyBasic = ({locationString, temp, description, minTemp, maxTemp, loading, error}) => {
    const {text} = useLanguage();
    const dispatch = useDispatch();
    const handlerCanselError = () => {
        dispatch(getResetError())
    }
    return !error ? (
        <div className={styles.daily_basic}>
            {!loading ? <h3>{locationString}</h3> : <h3>{text.loading}...</h3>}
            {!loading && <h1>{toCelsius(temp)}°</h1>}
            {!loading && <div className={styles.descriptions}>
                <p>{firstLetterCapitalized(description)}</p>
                <p>
                    <span>H: {toCelsius(minTemp)}°</span>
                    <span>L: {toCelsius(maxTemp)}°</span>
                </p>
            </div>}
        </div>
    ) : (<Error errorText={error} handlerError={handlerCanselError}/>);
};

DailyBasic.propTypes = {
    locationString: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    minTemp: PropTypes.number.isRequired,
    maxTemp: PropTypes.number.isRequired,
};

export default DailyBasic;