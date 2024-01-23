import Layout from "./Layout.jsx";
import {useApiWeather} from "./hooks/useApiRequests.js";

import styles from './App.module.scss'


function App() {

    const {error} = useApiWeather();

    return (
        <div className={styles.container}>
            <Layout/>
        </div>
    )
}

export default App
