import React from 'react';
import cn from "classnames";
import styles from "../allInformation.module.scss";
import {moon_cloud_mid_rain} from "../../../assets/image/cloud";

const ForecastItem = ({item, index}) => {
    return (
        <div
            key={item}
            className={cn(styles.item, {[styles.item_now]: index === 1})}
        >
            <span className={styles.time}>0{item} AM</span>
            <div className={styles.weather_icon}>
                <img alt="cloud" src={moon_cloud_mid_rain} className={styles.icon}/>
                <span className={styles.label}>30%</span>
            </div>
            <span className={styles.temperature}>{item}°</span>
        </div>
    );
};

export default ForecastItem;