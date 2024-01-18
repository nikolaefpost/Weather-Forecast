import  {useRef} from 'react';
import {clear_sky_day} from "../../../assets/image/cloud";
import {uvIndex} from "../../../helpers/index.js";
import PropTypes from "prop-types";

import styles from "./weatherDetails.module.scss";
import {useLanguage} from "../../../context/index.js";


const Uvi = ({uv}) => {
    const {text, lang} = useLanguage();
    const lineRef = useRef(null);
    const uvValue =lineRef.current? uv/12*lineRef.current.offsetWidth: 0;

    return (
        <div className={styles.item}>
            <div className={styles.label}>
                <img alt="sun" src={clear_sky_day}/>
                <span>{text.uv_index}</span>
            </div>
            <div className={styles.uv}>
                <span className={styles.value}>{uv}</span>
                <span className={styles.description}>{uvIndex(uv, lang)}</span>
                <div className={styles.line_indicator}>
                    <div ref={lineRef} className={styles.line}/>
                    <div className={styles.point} style={{left: `${uvValue}px`}}/>
                </div>
            </div>

        </div>
    );
};

Uvi.propTypes = {
    uv: PropTypes.number.isRequired,
};
export default Uvi;