
import PropTypes from "prop-types";
import {check} from "../../assets/svgElement";

import styles from "./settings.module.scss";

const Settings = ({setIsSetting, setSettingsData, settingsData}) => {

    const onHandlerSettingElement = (el) => {
        setSettingsData(pre => {
            const setting = {...pre, [el]: !pre[el]}
            localStorage.setItem("settings", JSON.stringify(setting));
            return setting
        })
    }

    return (
        <div className={styles.settings}>
            <button onClick={() => setIsSetting(false)}>
                <span>&#8249;</span>
                <span>Setting</span>
            </button>
            {Object.entries(settingsData).map(el => (
                <div
                    key={el[0]}
                    className={styles.settings_element}
                    onClick={() => onHandlerSettingElement(el[0])}
                >
                    <span>{el[0]}</span>
                    <div>{el[1] && <img alt='check' src={check}/>}</div>
                </div>
            ))}
        </div>
    );
};

Settings.propTypes = {
    setIsSetting: PropTypes.func.isRequired,
    setSettingsData: PropTypes.func.isRequired,
    settingsData: PropTypes.object.isRequired
};

export default Settings;