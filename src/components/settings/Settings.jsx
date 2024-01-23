
import PropTypes from "prop-types";
import {check} from "../../assets/svgElement";
import {useLanguage} from "../../context/index.js";

import styles from "./settings.module.scss";



const Settings = ({setIsSetting, setSettingsData, settingsData}) => {
    const {text, lang, onChangeLang} = useLanguage();
    const languages = [
        {
            val: "en",
            label: lang === "en"? "EN":"англ-ка"
        },
        {
            val: "ua",
            label: lang === "en"? "UA":"укр-ка"
        }]
    const onHandlerSettingElement = (el) => {
        setSettingsData(pre => {
            const setting = {
                ...pre,
                [el]: { ...pre[el], value: !pre[el].value }
            };

            localStorage.setItem("settings", JSON.stringify(setting));
            return setting
        })
    }

    const handleLanguageChange = (event) => {
        onChangeLang(event.target.value);
    };

    return (
        <div className={styles.settings}>
            <button onClick={() => setIsSetting(false)}>
                <span>&#8249;</span>
                <span>{text.setting}</span>
            </button>
            <fieldset className={styles.settings_element}>
                <legend>{text.select_language}</legend>
                {languages.map(langEl=> (
                    <div className={styles.radio} key={langEl.val}>
                        <input
                            type="radio"
                            id={langEl.val}
                            name="language"
                            value={langEl.val}
                            checked={lang === langEl.val}
                            onChange={handleLanguageChange}
                        />
                        <label htmlFor={langEl.val}>{langEl.label}</label>
                    </div>
                ))}
            </fieldset>
            {Object.entries(settingsData).map(el => (
                <div
                    key={el[0]}
                    className={styles.settings_element}
                    onClick={() => onHandlerSettingElement(el[0])}
                >
                    <span>{el[1].label}</span>
                    <div className={styles.check_in}>{el[1].value && <img alt='check' src={check}/>}</div>
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