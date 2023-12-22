import React from 'react';
import styles from "./allInformation.module.scss";
import {shape} from "../../assets/svgElement/index.js";
import cn from "classnames";

const SegmentedControl = ({isWeekly, setMode, handleMouseDown}) => {
    return (
        <div
            className={styles.segmented_control}
            // onMouseDown={handleMouseDown}
        >
            <img alt="shape" src={shape} className={styles.shape}/>
            <div className={styles.separator_up}/>
            <button onClick={setMode}>Hourly Forecast</button>
            <button onClick={setMode}>Weekly Forecast</button>
            <div className={styles.separator_down}/>
            <div className={cn(styles.underline, {[styles.underline_weekly]: isWeekly})}/>
        </div>
    );
};

export default SegmentedControl;