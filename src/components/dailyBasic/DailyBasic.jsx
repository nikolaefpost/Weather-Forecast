import React from 'react';

import styles from "./dailyBasic.module.scss"

const DailyBasic = () => {
    return (
        <div className={styles.daily_basic}>
            <h3>Montreal</h3>
            <h1>19°</h1>
            <div className={styles.descriptions}>
                <p>Mostly Clear</p>
                <p>
                    <span>H:24°</span>
                    <span>L:18°</span>
                </p>
            </div>

        </div>
    );
};

export default DailyBasic;