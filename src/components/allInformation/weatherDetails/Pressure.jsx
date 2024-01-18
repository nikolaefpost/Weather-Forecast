
import {clear_sky_day} from "../../../assets/image/cloud/index.js";
import Barometer from "./Barometer.jsx";
import PropTypes from "prop-types";

import styles from "./weatherDetails.module.scss";
import {useLanguage} from "../../../context/index.js";

const Pressure = ({value}) => {
    const {text} = useLanguage();
    const ofMercury = Math.round(value*0.75007);

    return (
        <div className={styles.item}>
            <div className={styles.label}>
                <img alt="sun" src={clear_sky_day}/>
                <span>{text.pressure}</span>
            </div>
            <div className={styles.pressure}>
                <Barometer value={value}/>
                <span className={styles.of_mercury}>{ofMercury}</span>
                <span className={styles.mmHg}>{text.mmHg}</span>

            </div>

        </div>
    );
};

Pressure.propTypes = {
    value: PropTypes.number.isRequired,
};

export default Pressure;