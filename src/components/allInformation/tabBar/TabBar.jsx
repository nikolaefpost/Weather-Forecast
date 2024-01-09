
import styles from "../allInformation.module.scss"
import {tabBarBack, tabBarSubtract, buttonPlus} from "../../../assets/svgElement";
import {menu} from "../../../assets/image"
import LocationComponent from "./LocationComponent.jsx";
import PropTypes from "prop-types";

const TabBar = ({onHandleSearch, onHandleSettingToggle}) => {
    return (
        <div className={styles.tab_bar}>
            <div className={styles.back}>
                <img alt="tabbar" src={tabBarBack} className={styles.svg}/>
                <div className={styles.menu_block}>
                    {/*<input type="image" src={point} alt="point"/>*/}
                    <LocationComponent/>
                    <input type="image" src={menu} alt="menu" onClick={onHandleSettingToggle}/>
                </div>
            </div>
            <div className={styles.front}>
                <img alt='button' src={tabBarSubtract}/>
                <input type="image" src={buttonPlus} alt="plus" onClick={onHandleSearch}/>
            </div>
        </div>
    );
};

TabBar.propTypes = {
    onHandleSearch: PropTypes.func.isRequired,
    onHandleSettingToggle: PropTypes.func.isRequired
};

export default TabBar;