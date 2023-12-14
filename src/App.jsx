import {useState} from 'react'
import styles from './App.module.scss'
import {DailyBasic} from "./components/index.js";
import AllInformation from "./components/allInformation/AllInformation.jsx";


function App() {
    // const [count, setCount] = useState(0)

    return (
        <div
            className={styles.container}
        >
            <div className={styles.content}>
                <div className={styles.house}/>
                <div className={styles.shadow}/>
                <DailyBasic/>
                <AllInformation/>
            </div>

        </div>
    )
}

export default App
