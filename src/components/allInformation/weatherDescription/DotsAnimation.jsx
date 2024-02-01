// DotsAnimation.js
import  { useState, useEffect } from 'react';

import styles from "./weatherDescription.module.scss"

const DotsAnimation = () => {
    const [numDots, setNumDots] = useState(1);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setNumDots((prevNum) => (prevNum < 23 ? prevNum + 1 : 1));
        }, 200);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={styles.dots_container}>
            {Array(numDots).fill('.').join('')}
        </div>
    );
};

export default DotsAnimation;
