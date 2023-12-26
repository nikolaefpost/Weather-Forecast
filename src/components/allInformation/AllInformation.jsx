
import {rectangle, ellipse1, ellipse2, ellipse3} from "../../assets/svgElement";
import SegmentedControl from "./SegmentedControl.jsx";
import Forecast from "./forecast/Forecast.jsx";
import TabBar from "./tabBar/TabBar.jsx";
import PropTypes from "prop-types";

import styles from "./allInformation.module.scss"
import {Sunrise, Uvi, Wind} from "./weatherDetails";


const AllInformation = ({forecastData, isWeekly, setIsWeekly, height, handleTouchMove, weatherDetails}) => {
const {uv, sunrise, sunset, windDeg, windSpeed} = weatherDetails

    const setMode = () => {
        setIsWeekly(pre=>!pre)
    }

    return (
        <div
            className={styles.all_information}
            style={{height: `${height}px`}}
            onTouchMove={handleTouchMove}
        >
            <div className={styles.top_ellipse1}/>
            {(height < 350) && <img className={styles.border} alt='border' src={rectangle}/>}
            <img alt="ellipse" src={ellipse1} className={styles.ellipse1}/>
            <img alt="ellipse" src={ellipse2} className={styles.top_ellipse2}/>
            <img alt="ellipse" src={ellipse3} className={styles.ellipse3}/>
            <div className={styles.ellipse4}/>

            <SegmentedControl isWeekly={isWeekly} setMode={setMode} handleMouseDown={handleTouchMove}/>
            <Forecast forecastData={forecastData} isWeekly={isWeekly} />
            {(height < 350) && <TabBar/>}
            {(height > 350) && <div className={styles.weather_details}>
                <Uvi uv={uv}/>
                <Sunrise  sunrise={sunrise} sunset={sunset}/>
                <Wind windDeg={windDeg} windSpeed={windSpeed} />
            </div>}
        </div>
    );
};

AllInformation.propTypes = {
    forecastData: PropTypes.array.isRequired,
    isWeekly: PropTypes.bool.isRequired,
    setIsWeekly: PropTypes.func.isRequired,
    handleTouchMove: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    weatherDetails: PropTypes.object.isRequired,
};

export default AllInformation;