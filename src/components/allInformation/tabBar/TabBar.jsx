import React from 'react';

import styles from "../allInformation.module.scss"
import {tabBarBack, tabBarSubtract, buttonPlus} from "../../../assets/svgElement";
import {point, menu} from "../../../assets/image"
import LocationComponent from "./LocationComponent.jsx";

const TabBar = () => {
    return (
        <div className={styles.tab_bar}>
            <div className={styles.back}>
                <img alt="tabbar" src={tabBarBack} className={styles.svg}/>
                <div className={styles.menu_block}>
                    {/*<input type="image" src={point} alt="point"/>*/}
                    <LocationComponent/>
                    <input type="image" src={menu} alt="menu"/>
                </div>
            </div>
            <div className={styles.front}>
                <img alt='button' src={tabBarSubtract}/>
                <input type="image" src={buttonPlus} alt="plus"/>
            </div>
        </div>
    );
};

export default TabBar;