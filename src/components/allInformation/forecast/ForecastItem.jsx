import React from 'react';
import cn from "classnames";
import PropTypes from "prop-types";
import {cloudsData} from "../../../helpers/index.js";

import styles from "../allInformation.module.scss";


const ForecastItem = ({id, hour, day, date, month, cloudIcon, clouds, temp, index, isWeekly}) => {

    return (
        <div
            key={id}
            className={
            cn(styles.item, {[styles.item_now]: index === (isWeekly? 0: 1)})}
        >
            <div className={styles.date}>
                {!isWeekly ? <span className={styles.time}>{hour}:00 </span> :
                    <span className={styles.time}>{day} </span>
                }
                {/*<span className={styles.time}>{day}.{month} </span>*/}
            </div>

            <div className={styles.weather_icon}>
                <img
                    alt="cloud"
                    src={cloudsData[cloudIcon]}
                    className={styles.icon}
                />
                <span className={styles.label}>{clouds}%</span>
            </div>
            <span className={styles.temperature}>{temp}°</span>
        </div>
    );
};

ForecastItem.propTypes = {
    id: PropTypes.number.isRequired,
    hour: PropTypes.number.isRequired,
    day: PropTypes.string,
    date: PropTypes.number,
    month: PropTypes.string,
    cloudIcon: PropTypes.string.isRequired,
    clouds: PropTypes.number.isRequired,
    temp: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    isWeekly: PropTypes.bool.isRequired,
};

export default ForecastItem;