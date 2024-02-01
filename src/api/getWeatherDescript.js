import { openaiUrl } from "../helpers";
import PropTypes from "prop-types";

const MODEL = "gpt-3.5-turbo-0613";
const SYSTEM_ROLE = "system";
const USER_ROLE = "user";

const getWeatherDescription = async (prompt, weatherData, lang) => {
    const language = lang==="en"? "English": "Ukrainian"
    const sysMsg = `Answer the questions below in a conversational, humorous tone, like a native  speaker, [For location] based on [Weather Data].
    
    - Provide an opinion about what the weather feels like?
    - Provide temperature in either Celsius or Fahrenheit, whichever is more appropriate? IMPORTANT! Never display the temperature in Kelvin.
    - Write your recommendations based on the weather?
    - What is best to wear?
    - How to prepare for this weather?
    
    Give the answer in ${language}
    `;

    const newPrompt = `For location ${prompt}. Weather Data: ${JSON.stringify(weatherData)}`;

    const data = {
        model: MODEL,
        messages: [
            { role: SYSTEM_ROLE, content: sysMsg },
            { role: USER_ROLE, content: newPrompt },
        ],
    };

    const params = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(openaiUrl, params);
        const responseData = await response.json();
        return responseData.choices[0].message.content;
    } catch (error) {
        console.error("Error in getWeatherDescription:", error);
        throw error;
    }
};

getWeatherDescription.propTypes = {
    prompt: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    weatherData: PropTypes.object.isRequired,
};

export default getWeatherDescription;
