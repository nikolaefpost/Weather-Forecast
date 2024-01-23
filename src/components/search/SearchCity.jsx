import  {useState} from 'react';
import {searchIcon} from "../../assets/image";
import PropTypes from "prop-types";
import fetchDataPrompt from "../../api/fetchDataPrompt.js";
import {useDispatch} from "react-redux";

import styles from './serchCity.module.scss'
import {useLanguage} from "../../context/index.js";

const SearchCity = ({setIsSearch}) => {
    const dispatch = useDispatch();
    const {text, lang} = useLanguage();
    const [value, setValue] = useState("")

    const handlerPromptValue = (e) => {
        setValue(e.target.value)
    }
    // const {error: errorPromt} = useApiPromptRequests(prompt);
    const handleSubmit = (e) => {
      e.preventDefault()
        fetchDataPrompt(value,lang, dispatch)
        setIsSearch(false)
    }

    return (
        <div className={styles.search}>
            <button onClick={()=>setIsSearch(false)}>
                <span>&#8249;</span>
                <span>{text.weather}</span>
            </button>
            <form onSubmit={handleSubmit} className={styles.inputBlock}>
                <button type="submit" ><img alt="search" src={searchIcon}/></button>

                <input
                    type="text"
                    value={value}
                    onChange={handlerPromptValue}
                    placeholder={text.search_city}
                />
            </form>


        </div>
    );
};

SearchCity.propTypes = {
    setIsSearch: PropTypes.func.isRequired
};

export default SearchCity;