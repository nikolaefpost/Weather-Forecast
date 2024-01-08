
import {firstLetterCapitalized, toCelsius} from "../../helpers/index.js";
import PropTypes from "prop-types";

import styles from "./dailyBasic.module.scss";

const DailyBasic = ({locationString, temp, description, minTemp, maxTemp, loading}) => {
    return (
        <div className={styles.daily_basic}>
            {!loading ? <h3>{locationString}</h3> : <h3>loading</h3>}
            <h1>{toCelsius(temp)}°</h1>
            <div className={styles.descriptions}>
                <p>{firstLetterCapitalized(description)}</p>
                <p>
                    <span>H: {toCelsius(minTemp)}°</span>
                    <span>L: {toCelsius(maxTemp)}°</span>
                </p>
            </div>

        </div>
    );
};

DailyBasic.propTypes = {
    locationString: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    minTemp: PropTypes.number.isRequired,
    maxTemp: PropTypes.number.isRequired,
};

export default DailyBasic;