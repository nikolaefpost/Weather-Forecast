
import styles from "./weatherDescription.module.scss"
import PropTypes from "prop-types";
import {useLanguage} from "../../../context/index.js";
import DotsAnimation from "./DotsAnimation.jsx";

const WeatherDescription = ({description}) => {
    const {text} = useLanguage();
    const data = description? description : text.wait_little

    return (
        <div className={styles.weatherDescription}>
            {data}
            {!description && <DotsAnimation/>}
        </div>
    );
};

WeatherDescription.propTypes = {
    description: PropTypes.string.isRequired,
};
export default WeatherDescription;