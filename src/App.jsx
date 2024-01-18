import Layout from "./Layout.jsx";

import styles from './App.module.scss'
import {useApiWeather} from "./hooks/useApiRequests.js";
import {LanguageProvider} from "./context/lanuage.jsx"

function App() {
    const {error} = useApiWeather();

    return (
        <LanguageProvider>
            <div className={styles.container}>
                <Layout/>
            </div>
        </LanguageProvider>
    )
}

export default App
