import React from 'react';

import styles from "./weatherDescription.module.scss"

const WeatherDescription = ({description}) => {
    return (
        <div className={styles.weatherDescription}>
            {description}
        </div>
    );
};

export default WeatherDescription;