import  {useState} from 'react';
import {searchIcon} from "../../assets/image";
import PropTypes from "prop-types";
import fetchDataPrompt from "../../api/fetchDataPrompt.js";
import {useDispatch} from "react-redux";

import styles from './serchCity.module.scss'

const SearchCity = ({setIsSearch}) => {
    const dispatch = useDispatch();
    // const [prompt, setPrompt] = useState("");
    const [value, setValue] = useState("")

    const handlerPromptValue = (e) => {
        setValue(e.target.value)
    }
    // const {error: errorPromt} = useApiPromptRequests(prompt);
    const handleSubmit = (e) => {
      e.preventDefault()
        console.log(value)
        fetchDataPrompt(value, dispatch)
        setIsSearch(false)
    }

    return (
        <div className={styles.search}>
            <button onClick={()=>setIsSearch(false)}>
                <span>&#8249;</span>
                <span>Weather</span>
            </button>
            <form onSubmit={handleSubmit} className={styles.inputBlock}>
                <button type="submit" ><img alt="search" src={searchIcon}/></button>

                <input
                    type="text"
                    value={value}
                    onChange={handlerPromptValue}
                    placeholder=" Search for a city or airport"
                />
            </form>


        </div>
    );
};

SearchCity.propTypes = {
    setIsSearch: PropTypes.func.isRequired
};

export default SearchCity;