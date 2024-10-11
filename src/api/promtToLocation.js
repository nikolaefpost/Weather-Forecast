import PropTypes from "prop-types";
import {openaiUrl} from "../helpers/index.js";

const promptToLocation = (prompt, lang) => {

    const language = lang === "en" ? "in English" : "in Ukrainian";

    const promptData = JSON.parse(localStorage.getItem(prompt));
    if (promptData?.locationString)  return promptData;


    const data = {
        "model": "gpt-4",
        messages: [{role: "user", content: prompt}],
        functions: [
            {
                name: "displayData",
                description: `do not answer any questions in the request; your task is to determine the name of the locality and provide data according to the template ${language}`,
                parameters: {
                    type: "object",
                    properties: {
                        country: {
                            type: "string",
                            description: "Country name.",
                        },
                        countryCode: {
                            type: "string",
                            description: "Country code. Use ISO_3166-1_alpha-2",
                        },
                        USstate: {
                            type: "string",
                            description: "Full state name.",
                        },
                        state: {
                            type: "string",
                            description: "Two-letter state code.",
                        },
                        city: {
                            type: "string",
                            description: "City name.",
                        },
                        unit: {
                            type: "string",
                            description: "location unit: metric or imperial.",
                        },
                        hemisphere: {
                            type: "string",
                            description: "hemisphere of the earth"
                        }
                    },
                    required: [
                        "countryCode",
                        "country",
                        "USstate",
                        "state",
                        "city",
                        "unit",
                        "hemisphere"
                    ],
                },
            }

        ],
        function_call: "auto",
    };

    const params = {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        method: "POST",
    };

    return fetch(openaiUrl, params)
        .then((response) => response.json())
        .then((data) => {
            const promptRes = JSON.parse(
                data.choices[0].message.function_call.arguments
            );

            const locationString = () => {
                if (promptRes.countryCode === "US") {
                    return `${promptRes.city},${promptRes.state}, ${promptRes.countryCode}`;
                } else {
                    return `${promptRes.city}, ${promptRes.countryCode}`;
                }
            };

            const promptData = {
                locationString: locationString(),
                units: promptRes.unit,
                country: promptRes.country,
                USstate: promptRes.USstate
            }

            if (promptRes?.city) localStorage.setItem(prompt, JSON.stringify(promptData));

            return promptData;
        })
        .catch((error) => {
            console.log("Error:", error);
            return Promise.reject(
                "Unable to identify a location from your question. Please try again."
            );
        });
};

promptToLocation.propTypes = {
    prompt: PropTypes.string.isRequired,
};

export default promptToLocation;
