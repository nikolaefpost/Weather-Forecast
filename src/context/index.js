import {createContext, useContext} from "react";

export const SettingContext = createContext({});
export const useLanguage = () => useContext(SettingContext);