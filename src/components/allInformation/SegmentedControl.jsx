
import styles from "./allInformation.module.scss";
import {shape} from "../../assets/svgElement/index.js";
import PropTypes from "prop-types";

const SegmentedControl = ({ handleMouseDown}) => {
    return (
        <div
            className={styles.segmented_control}
            onTouchMove={handleMouseDown}
        >
            <img alt="shape" src={shape} className={styles.shape}/>
            <div className={styles.separator_up}/>
        </div>
    );
};

SegmentedControl.propTypes = {
    handleMouseDown: PropTypes.func.isRequired,
};

export default SegmentedControl;