import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Crear el Context
export const MoviesContext = createContext();

// Provider es donde se encuentran las funciones y state
const MoviesProvider = (props) => {

    // crear el state del Context
    const [movies, guardarMovies] = useState([]);

    // ejecutar el llamado a la api
    useEffect(() => {
        const obtenerMovies = async () => {
            const key = "40db715f973f0a4b6b13ad0210fc78a9";
            const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${key}`;

            const movies = await axios.get(url);

            guardarMovies(movies.data.results);
        }
        obtenerMovies();
    }, []);

    return (
        <MoviesContext.Provider
            value={{
                movies
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    )
}
export default MoviesProvider;