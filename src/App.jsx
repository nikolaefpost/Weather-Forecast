
import Layout from "./Layout.jsx";

import styles from './App.module.scss'
import {useApiPromptRequests, useApiWeather} from "./hooks/useApiRequests.js";

function App() {
    const {error: errorPromt} = useApiPromptRequests("Odessa");
    const {error } = useApiWeather();

    return (
        <div
            className={styles.container}
        >
           <Layout />
        </div>
    )
}

export default App
