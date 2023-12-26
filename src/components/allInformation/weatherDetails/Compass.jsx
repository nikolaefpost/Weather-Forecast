
import PropTypes from "prop-types";

import styles from "./weatherDetails.module.scss";
const Compass = ({windDeg}) => {
    const items = [];
    const direction = windDeg > 180 ? windDeg-180 : windDeg + 180

    const arrowTrans = windDeg ? `rotate(${direction} 50 50)`: "rotate(0 50 50)"

    for (let i = 0; i < 360; i += 5) {
        let tr = `rotate(${i} 50 50)`;
        let width=.5;
        let long = 10;
        if (i === 0 || i % 30 === 0){
            width = 1.5;
            long = 13;
        }
        // let width = (i === 0 || i % 30 === 0) ? 1.5 : 0.5;
        items.push(<line key={i} x1="50" y1="5" x2="50" y2={long} transform={tr} strokeWidth={width} />);
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
            <polygon points="50,0 60,20 52,30 52,40 48,40 48,30 40,20" fill="#e5459b" transform={arrowTrans}/>

            <polygon points="48,70 52,70 52,80 55,95 50,100 45,95 48,80" fill="white" transform={arrowTrans}/>

            {/*Compass directions*/}
            <text className={styles.description} x="50" y="22" textAnchor="middle" fontSize="2" fill="white">N</text>
            <text className={styles.description} x="50" y="85" textAnchor="middle" fontSize="2" fill="white">S</text>
            <text className={styles.description} x="80" y="55" textAnchor="middle" fontSize="2" fill="white">E</text>
            <text className={styles.description} x="20" y="55" textAnchor="middle" fontSize="2" fill="white">W</text>

            {/*Notches for degrees*/}
            <g stroke="rgba(235, 235, 245, 0.60)" strokeWidth="1" fill="transparent">
                {items}
            </g>
        </svg>
    );
};

Compass.propTypes = {
    windDeg: PropTypes.number.isRequired,
};

export default Compass;
