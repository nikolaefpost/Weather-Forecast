import React from 'react';
import ForecastItem from "./ForecastItem.jsx";
import PropTypes from "prop-types";

import styles from "../allInformation.module.scss"


const Forecast = ({forecastData, isWeekly}) => {
    return (
        <div className={styles.forecast}>
            <div className={styles.shift_block}>
                {forecastData.map((item, index)=>(
                    <ForecastItem key={item.id} {...item} index={index} isWeekly={isWeekly}/>
                ))}
            </div>
        </div>
    );
};

Forecast.propTypes = {
    forecastData: PropTypes.array.isRequired,
    isWeekly: PropTypes.bool.isRequired,
};
export default Forecast;