import React, {useState} from 'react';
import cn from "classnames";


import styles from "./allInformation.module.scss"
import {rectangle, ellipse1, ellipse2, shape, ellipse3} from "../../assets/svgElement";
import SegmentedControl from "./SegmentedControl.jsx";
import Forecast from "./forecast/Forecast.jsx";
import TabBar from "./tabBar/TabBar.jsx";

const AllInformation = () => {
    const [isWeekly, setIsWeekly]= useState(true)

    const setMode = () => {
        setIsWeekly(pre=>!pre)
    }

    return (
        <div className={styles.all_information}>
            <div className={styles.top_ellipse1}/>
            <img className={styles.border} alt='border' src={rectangle}/>
            <img alt="ellipse" src={ellipse1} className={styles.ellipse1}/>
            <img alt="ellipse" src={ellipse2} className={styles.top_ellipse2}/>
            <img alt="ellipse" src={ellipse3} className={styles.ellipse3}/>
            <div className={styles.ellipse4}/>

            <SegmentedControl isWeekly={isWeekly} setMode={setMode}/>
            <Forecast/>
            <TabBar/>
        </div>
    );
};

export default AllInformation;