import Layout from "./Layout.jsx";
import {useApiWeather} from "./hooks/useApiRequests.js";

import styles from './App.module.scss'
import Error from "./components/error/Error.jsx";


function App() {

    const {error, setError} = useApiWeather();

    return (
        <div className={styles.container}>
            {error ? <div className={styles.error_wrap}><Error errorText={error} handlerError={()=>setError(null)}/></div>: <Layout/>}
        </div>
    )
}

export default App
