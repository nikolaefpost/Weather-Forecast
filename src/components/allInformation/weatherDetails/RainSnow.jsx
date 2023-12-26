
import PropTypes from "prop-types";
import {rain, snow } from "../../../assets/image/index.js";

import styles from "./weatherDetails.module.scss";

const RainSnow = ({value, title}) => {

    const precipitation = {rainfall:rain, snowfall: snow}
    return (
        <div className={styles.item}>
            <div className={styles.label}>
                <img alt="sun" src={precipitation[title]}/>
                <span>{title}</span>
            </div>
            <div className={styles.rain_snow}>
                <span className={styles.value}>{value} mm</span>
                <span className={styles.description}>in last hour</span>
            </div>

        </div>
    );
};

RainSnow.propTypes = {
    value: PropTypes.number.isRequired,
    title: PropTypes.oneOf(['rainfall','snowfall']),
};

export default RainSnow;