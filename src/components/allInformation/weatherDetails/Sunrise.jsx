
import {sunrise as sunriseImg } from "../../../assets/image/cloud";
import PropTypes from "prop-types";
import {sunrise_func} from "../../../assets/image";

import styles from "./weatherDetails.module.scss";

const Sunrise = ({sunrise, sunset}) => {

    const rise = new Date(sunrise*1000);
    const set = new Date(sunset*1000);

    return (
        <div className={styles.item}>
            <div className={styles.label}>
                <img alt="sun" src={sunriseImg}/>
                <span>sunrise</span>
            </div>
            <div className={styles.sunrise}>
                <div className={styles.value}>{rise.getHours()}:{rise.getMinutes()} AM</div>
                <img alt="function" src={sunrise_func} />
                <div className={styles.description}>
                    Sunset: {set.getHours()}:{set.getMinutes()<10? `0${set.getMinutes()}`: set.getMinutes()} PM
                </div>
            </div>
        </div>
    );
};

Sunrise.propTypes = {
    sunrise: PropTypes.number.isRequired,
    sunset: PropTypes.number.isRequired,
};

export default Sunrise;