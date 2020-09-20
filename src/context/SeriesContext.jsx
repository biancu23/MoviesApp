import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Crear el Context
export const SeriesContext = createContext();

// Provider es donde se encuentran las funciones y state
const SeriesProvider = (props) => {

    // crear el state del Context
    const [series, guardarSeries] = useState([]);

    // ejecutar el llamado a la api
    useEffect(() => {
        const obtenerSeries = async () => {
            const url = 'https://api.themoviedb.org/3/trending/tv/week?api_key=40db715f973f0a4b6b13ad0210fc78a9';

            const series = await axios.get(url);

            guardarSeries(series.data.results);
        }
        obtenerSeries();
    }, []);

    return (
        <SeriesContext.Provider
            value={{
                series
            }}
        >
            {props.children}
        </SeriesContext.Provider>
    )
}
export default SeriesProvider;