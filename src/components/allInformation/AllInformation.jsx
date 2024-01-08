
import { ellipse1, ellipse2, ellipse3} from "../../assets/svgElement";
import SegmentedControl from "./SegmentedControl.jsx";
import Forecast from "./forecast/Forecast.jsx";
import TabBar from "./tabBar/TabBar.jsx";
import PropTypes from "prop-types";
import {Sunrise, Uvi, Wind, RainSnow} from "./weatherDetails";
import Universal from "./weatherDetails/Universal.jsx";
import {feels_like, visibilityIcon, humidityIcon} from "../../assets/image";
import {toCelsius} from "../../helpers/index.js";
import Pressure from "./weatherDetails/Pressure.jsx";

import styles from "./allInformation.module.scss";
import LocationComponent from "./tabBar/LocationComponent.jsx";


const AllInformation = ({forecastData, isWeekly, setIsWeekly, height, handleTouchMove, weatherDetails, detailsOn, onHandleSearch}) => {
const {uv, sunrise, sunset, windDeg, windSpeed, rain, snow, feelsLike, humidity, dewPoint, visibility,
    pressure} = weatherDetails

    const feelsLikeStr = `${toCelsius(feelsLike)}°`
    const humidityStr = `${humidity}%`;
    const humidityDesc = `The dew point is ${toCelsius(dewPoint)}° right now`;
    const visibilityStr = `${visibility/1000} km`


    const setMode = () => {
        setIsWeekly(pre=>!pre)
    }

    return (
        <div
            className={styles.all_information}
            style={{height: `${height}px`}}
            // onTouchMove={handleTouchMove}
        >
            <div className={styles.top_ellipse1}/>
            {/*{(height < 350) && <img className={styles.border} alt='border' src={rectangle}/>}*/}
            {/*<img className={styles.border} alt='border' src={rectangle}/>*/}
            <img alt="ellipse" src={ellipse1} className={styles.ellipse1}/>
            <img alt="ellipse" src={ellipse2} className={styles.top_ellipse2}/>
            <img alt="ellipse" src={ellipse3} className={styles.ellipse3}/>
            <div className={styles.ellipse4}/>

            <SegmentedControl handleMouseDown={handleTouchMove}/>
            <div className={styles.all_information_wrap} style={{paddingBottom: detailsOn? "50px": "0"}}>
                <Forecast forecastData={forecastData} isWeekly={isWeekly} setMode={setMode}/>
                {(height < 350) && <TabBar onHandleSearch={onHandleSearch} />}
                {(height > 350) && <div className={styles.weather_details}>
                    <Uvi uv={uv}/>
                    <Sunrise sunrise={sunrise} sunset={sunset}/>
                    <Wind windDeg={windDeg} windSpeed={windSpeed}/>
                    {rain && <RainSnow value={rain} title="rainfall"/>}
                    {snow && <RainSnow value={snow} title="snowfall"/>}
                    <Universal
                        value={feelsLikeStr}
                        title="feels like"
                        description="Similar to the actual temperature"
                        icon={feels_like}
                    />
                    <Universal
                        value={humidityStr}
                        title="humidity"
                        description={humidityDesc}
                        icon={humidityIcon}
                    />
                    <Universal
                        value={visibilityStr}
                        title="visibility"
                        icon={visibilityIcon}
                    />
                    <Pressure value={pressure}/>

                </div>}
                {(height > 350) &&<LocationComponent/>}
            </div>

        </div>
    );
};

AllInformation.propTypes = {
    forecastData: PropTypes.array.isRequired,
    isWeekly: PropTypes.bool.isRequired,
    detailsOn: PropTypes.bool.isRequired,
    setIsWeekly: PropTypes.func.isRequired,
    handleTouchMove: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    weatherDetails: PropTypes.object.isRequired,
    onHandleSearch: PropTypes.func.isRequired
};

export default AllInformation;