import PropTypes from "prop-types";

import styles from "./weatherDetails.module.scss";

const Compass = ({value}) => {
    const items = [];
    const adaptedValue = () => {
        if (!value) return 0;
        if (value < 970) return 970;
        return (value-970)*3
    }

    const arrowTrans = value ? `rotate(${adaptedValue()} 50 50)` : "rotate(0 50 50)"

    for (let i = 0; i < 211; i += 5) {
        let tr = `rotate(${i} 50 50)`;
        let width = .5;
        let long = 15;
        if (i === 0 || i % 30 === 0) {
            width = 2.5;
            long = 20;
        }
        // let width = (i === 0 || i % 30 === 0) ? 1.5 : 0.5;
        items.push(<line key={i} x1="50" y1="5" x2="50" y2={long} transform={tr} strokeWidth={width}/>);
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
            <polygon points="50,2 53,25 57,30 51,35 52,48 48,48 49,35 43,30 47,25" fill="#e5459b"
                     transform={arrowTrans}/>
            <circle cx="50" cy="50" r="3" stroke="#e5e5e5" fill="transparent" strokeWidth="2"/>

            {/*<polygon points="48,70 52,70 52,80 55,95 50,100 45,95 48,80" fill="white" transform={arrowTrans}/>*/}

            {/*Compass directions*/}
            <text className={styles.description} x="50" y="22" textAnchor="middle" fontSize="2" fill="white">970</text>
            <text className={styles.description} x="50" y="85" textAnchor="middle" fontSize="2" fill="white">1030</text>
            <text className={styles.description} x="80" y="55" textAnchor="middle" fontSize="2" fill="white">1000</text>
            {/*<text className={styles.description} x="20" y="55" textAnchor="middle" fontSize="2" fill="white">1030</text>*/}

            {/*Notches for degrees*/}
            <g stroke="rgba(235, 235, 245, 0.60)" strokeWidth="1" fill="transparent">
                {items}
            </g>
        </svg>
    );
};

Compass.propTypes = {
    value: PropTypes.number.isRequired,
};

export default Compass;
