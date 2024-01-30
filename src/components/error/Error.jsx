
import PropTypes from "prop-types";
import {useLanguage} from "../../context/index.js";

import styles from "./error.module.scss";

const Error = ({errorText, handlerError}) => {
    const { text } = useLanguage();


    return (
        <div className={styles.error}>
            <p>{errorText}</p>
            <button onClick={handlerError}>{text.return}</button>
        </div>
    );
};

Error.propTypes = {
    errorText: PropTypes.string,
    handlerError: PropTypes.func.isRequired
};

export default Error;