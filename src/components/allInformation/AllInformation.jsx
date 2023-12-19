import React, {useState} from 'react';
import {rectangle, ellipse1, ellipse2, shape, ellipse3} from "../../assets/svgElement";
import SegmentedControl from "./SegmentedControl.jsx";
import Forecast from "./forecast/Forecast.jsx";
import TabBar from "./tabBar/TabBar.jsx";
import PropTypes from "prop-types";

import styles from "./allInformation.module.scss"

const AllInformation = ({forecastData, isWeekly, setIsWeekly}) => {

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
            <Forecast forecastData={forecastData} isWeekly={isWeekly} />
            <TabBar/>
        </div>
    );
};

AllInformation.propTypes = {
    forecastData: PropTypes.array.isRequired,
    isWeekly: PropTypes.bool.isRequired,
    setIsWeekly: PropTypes.func.isRequired,
};

export default AllInformation;