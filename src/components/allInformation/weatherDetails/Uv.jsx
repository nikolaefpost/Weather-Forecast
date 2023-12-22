import React from 'react';
import {clear_sky_day} from "../../../assets/image/cloud";

import styles from "./weatherDetails.module.scss"
import {uvIndex} from "../../../helpers/index.js";

const Uv = ({uv}) => {
    return (
        <div className={styles.item}>
            <div className={styles.label}>
                <img alt="sun" src={clear_sky_day}/>
                <span>uv index</span>
            </div>
            <div className={styles.uv}>
                <span className={styles.value}>{uv}</span>
                <span className={styles.description}>{uvIndex[uv]}</span>
            </div>

        </div>
    );
};

export default Uv;