import  { useState, useEffect } from 'react';
import { searchIcon } from "../../assets/image";
import PropTypes from "prop-types";
import fetchDataPrompt from "../../api/fetchDataPrompt.js";
import { useDispatch } from "react-redux";

import styles from './serchCity.module.scss'
import { useLanguage } from "../../context/index.js";

const SearchCity = ({ setIsSearch }) => {
    const dispatch = useDispatch();
    const { text, lang } = useLanguage();
    const [inputValue, setInputValue] = useState("");
    const [filteredCities, setFilteredCities] = useState([]);

    console.log(inputValue)

    useEffect(() => {
        // Fetch city data from GeoNames when the component mounts
        const fetchCityData = async () => {
            try {
                const response = await fetch(
                    `http://api.geonames.org/searchJSON?q=${inputValue}&lang=${lang}&username=weather_forecast`
                );

                if (!response.ok) {
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
                console.error('Error fetching city data:', error.message);
            }
        };

        // Fetch city data only if inputValue is not empty
        if (inputValue.trim() !== "") {
            fetchCityData();
        } else {
            setFilteredCities([]); // Clear the list if inputValue is empty
        }
    }, [inputValue, lang]);

    const handleSelectCity = (selectedCity) => {
        setInputValue(selectedCity.name);
        setFilteredCities([]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchDataPrompt(inputValue, lang, dispatch);
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
                {filteredCities.length > 0 && (
                    <ul className={styles.dropdown}>
                        {filteredCities.map(city => (
                            <li key={city.name} onClick={() => handleSelectCity(city)}>
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