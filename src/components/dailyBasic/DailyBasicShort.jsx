import React from 'react';
import {firstLetterCapitalized, toCelsius} from "../../helpers/index.js";
import PropTypes from "prop-types";
import cn from "classnames";

import styles from "./dailyBasic.module.scss"

const DailyBasicShort = ({locationString, temp, description}) => {
    return (
        <div className={cn(styles.daily_basic, styles.short)}>
            <h3>{locationString}</h3>
            <div className={styles.all_descriptions}>
                <p>{toCelsius(temp)}°</p>
                <p>{firstLetterCapitalized(description)}</p>
            </div>

        </div>
    );
};

DailyBasicShort.propTypes = {
    locationString: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    minTemp: PropTypes.number,
    maxTemp: PropTypes.number,
};

export default DailyBasicShort;