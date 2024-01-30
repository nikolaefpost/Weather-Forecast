
import styles from "./error.module.scss"
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {getResetError} from "../../features/location/locationSlice.js";
import {useLanguage} from "../../context/index.js";

const Error = ({errorText}) => {
    const { text } = useLanguage();
    const dispatch = useDispatch();
    const handlerCanselError = () => {
        dispatch(getResetError())
    }

    return (
        <div className={styles.error}>
            <p>{errorText}</p>
            <button onClick={handlerCanselError}>{text.return}</button>
        </div>
    );
};

Error.propTypes = {
    errorText: PropTypes.string
};

export default Error;