
import useApiRequests from "./hooks/useApiRequests.js";
import Layout from "./Layout.jsx";

import styles from './App.module.scss'




function App() {
    const promt = "Odessa";

    const {error, promptData, locationData, weatherData} = useApiRequests(promt);
    console.log(weatherData)




    return (
        <div
            className={styles.container}
        >
           <Layout promptData={promptData} weatherData={weatherData}/>
        </div>
    )
}

export default App
