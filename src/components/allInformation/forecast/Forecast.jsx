import React from 'react';

import styles from "../allInformation.module.scss"
import ForecastItem from "./ForecastItem.jsx";


const forecast = [1, 2, 3, 4, 5, 6, 7]

const Forecast = () => {
    return (
        <div className={styles.forecast}>
            <div className={styles.shift_block}>
                {forecast.map((item, index)=>(
                    <ForecastItem key={item} item={item} index={index}/>
                ))}
            </div>
        </div>
    );
};

export default Forecast;