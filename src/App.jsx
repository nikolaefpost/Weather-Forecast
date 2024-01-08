
import Layout from "./Layout.jsx";

import styles from './App.module.scss'
import { useApiWeather} from "./hooks/useApiRequests.js";

function App() {
    const { error } = useApiWeather();

    return (
        <div
            className={styles.container}
        >
           <Layout />
        </div>
    )
}

export default App
