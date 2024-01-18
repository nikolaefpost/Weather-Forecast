
import {wind} from "../../../assets/image/";
import Compass from "./Compass.jsx";
import PropTypes from "prop-types";

import styles from "./weatherDetails.module.scss";
import {useLanguage} from "../../../context/index.js";
const Wind = ({windDeg, windSpeed}) => {
    const {text} = useLanguage();
    return (
        <div className={styles.item}>
            <div className={styles.label}>
                <img alt="sun" src={wind}/>
                <span>{text.wind}</span>
            </div>
            <div className={styles.wind}>
                <Compass windDeg={windDeg} />
                <span className={styles.value}>{windSpeed}</span>
                <span className={styles.unit}>m/c</span>
            </div>


        </div>
    );
};

Wind.propTypes = {
    windDeg: PropTypes.number.isRequired,
    windSpeed: PropTypes.number.isRequired,
};

export default Wind;