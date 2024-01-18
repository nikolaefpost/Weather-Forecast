
import ForecastItem from "./ForecastItem.jsx";
import PropTypes from "prop-types";
import cn from "classnames";

import styles from "../allInformation.module.scss"
import {useLanguage} from "../../../context/index.js";



const Forecast = ({forecastData, isWeekly, setMode}) => {
    const {text} = useLanguage();
    return (
        <>
            <div className={styles.forecast}>
                <div className={styles.control}>
                    <button onClick={setMode}>{text.hourly_forecast}</button>
                    <button onClick={setMode}>{text.weekly_forecast}</button>
                    <div className={styles.separator_down}/>
                    <div className={cn(styles.underline, {[styles.underline_weekly]: isWeekly})}/>
                </div>
                <div className={styles.shift_block}>
                    {forecastData.map((item, index) => (
                        <ForecastItem key={item.id} {...item} index={index} isWeekly={isWeekly}/>
                    ))}
                </div>
            </div>
        </>
    );
};

Forecast.propTypes = {
    forecastData: PropTypes.array.isRequired,
    isWeekly: PropTypes.bool.isRequired,
    setMode: PropTypes.func.isRequired,
};
export default Forecast;