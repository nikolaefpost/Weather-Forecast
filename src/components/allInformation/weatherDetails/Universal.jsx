
import PropTypes from "prop-types";

import styles from './weatherDetails.module.scss';


const Universal = ({value, title, description, icon}) => {
    return (
        <div className={styles.item}>
            <div className={styles.label}>
                <img alt="sun" src={icon}/>
                <span>{title}</span>
            </div>
            <div className={styles.feels_like}>
                <span className={styles.value}>{value}</span>
                <span className={styles.description}>{description}</span>
            </div>

        </div>
    );
};

Universal.propTypes = {
    value: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    icon: PropTypes.string.isRequired,
};

export default Universal;