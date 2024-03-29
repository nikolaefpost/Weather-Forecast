import  { useState, useEffect } from 'react';
import { searchIcon } from "../../assets/image";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useLanguage } from "../../context/index.js";
import {fetchDataPrompt} from "../../features/location/locationSlice.js";

import styles from './serchCity.module.scss';

const SearchCity = ({ setIsSearch }) => {
    const dispatch = useDispatch();
    const { text, lang } = useLanguage();
    const language = lang === "en"? lang: "ru"
    const [inputValue, setInputValue] = useState("");
    const [filteredCities, setFilteredCities] = useState([]);
    const [error, setError] = useState('')


    useEffect(() => {
        // Fetch city data from GeoNames when the component mounts
        const fetchCityData = async () => {
            try {
                const response = await fetch(
                    `https://secure.geonames.org/searchJSON?q=${inputValue}&lang=${language}&username=weather_forecast`

                );

                if (!response.ok) {
                    setError('! Failed to fetch city data from GeoNames')
                    throw new Error('Failed to fetch city data from GeoNames');
                }

                const data = await response.json();

                // Extract relevant city information from the GeoNames response
                const cities = data.geonames.map(city => ({
                    name: city.name,
                    country: city.countryName,
                    // Add other properties you need
                }));

                setFilteredCities(cities);
            } catch (error) {
                setError(error.message)
                console.error('Error fetching city data:', error.message);
            }
        };

        // Fetch city data only if inputValue is not empty
        if (inputValue.trim() !== "") {
            fetchCityData();
        } else {
            setFilteredCities([]); // Clear the list if inputValue is empty
        }
    }, [inputValue, language]);

    // const handleSelectCity = (selectedCity) => {
    //     setInputValue(selectedCity.name);
    //     setFilteredCities([]);
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchDataPrompt(inputValue, lang));
        setIsSearch(false);
    }

    const handleListItemSubmit = (city, e ) => {

        const stringCity = `${city.name}, ${city.country}`
        e.preventDefault();
        dispatch(fetchDataPrompt(stringCity, lang));
        setIsSearch(false);
    }

    return (
        <div className={styles.search}>
            <button onClick={() => setIsSearch(false)}>
                <span>&#8249;</span>
                <span>{text.weather}</span>
            </button>
            <form onSubmit={handleSubmit} className={styles.inputBlock}>
                <button type="submit"><img alt="search" src={searchIcon} /></button>

                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={text.search_city}
                />
                {error && <span className={styles.error}>error :{error}</span>}
                {filteredCities.length > 0 && (
                    <ul className={styles.dropdown}>
                        {filteredCities.map((city, i) => (
                            <li key={i} onClick={(e) => handleListItemSubmit(city, e)}>
                                {`${city.name}, ${city.country}`}
                            </li>
                        ))}
                    </ul>
                )}
            </form>
        </div>
    );
};

SearchCity.propTypes = {
    setIsSearch: PropTypes.func.isRequired
};

export default SearchCity;