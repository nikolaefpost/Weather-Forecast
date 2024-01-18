import  {useEffect, useState} from "react";
import {data} from "./languageData";
import {SettingContext} from "./index.js"
import PropTypes from "prop-types";

const storage = window.localStorage;

export const LanguageProvider = ({children}) => {
    const currentLang = storage.getItem("language")

    const [lang, setLang] = useState(currentLang? currentLang: "en");
    const [text, setText] = useState({});

    const onChangeLang = (lang) => {
        setLang(lang);
        storage.setItem("language", lang);
    };

    useEffect(() => {
        const getLanguage = () => {
            if (lang === "en") {
                setText(data.en);
            } else {
                setText(data.ua);
            }
        };

        getLanguage(); // Call getLanguage directly inside the useEffect callback
    }, [lang]);

    const value = { text, lang, onChangeLang };

    return (
        <SettingContext.Provider value={value}>
            {children}
        </SettingContext.Provider>
    );
};

LanguageProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// export const useLanguage = () => useContext(SettingContext);