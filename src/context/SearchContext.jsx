import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


export const SearchContext = createContext();

const SearchProvider = (props) => {

    
    const [searchs, guardarSearchs] = useState([]);
    const [busqueda, buscarResults] = useState({
        search: '',
    });
    const [ consultar, guardarConsultar] = useState(false);

    const { search } = busqueda;

    useEffect(() => {
        if(consultar) {
            const obtenerSearch = async () => {
                const key = "40db715f973f0a4b6b13ad0210fc78a9"
                const url = `
                https://api.themoviedb.org/3/search/multi?api_key=${key}&language=en-US&query=${search}&page=1&include_adult=false`;

                const resultado = await axios.get(url);

                // console.log(resultado.data.drinks);
                guardarSearchs(resultado.data.results);
                
            }

            obtenerSearch();
        }
// eslint-disable-next-line
    }, [busqueda]);

    return ( 
        <SearchContext.Provider
            value={{
                searchs,
                buscarResults, 
                guardarConsultar
            }}
        >
            {props.children}
        </SearchContext.Provider>
     );
}
 
export default SearchProvider;