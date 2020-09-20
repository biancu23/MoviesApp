import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


export const InfoContext = createContext();

const InfoProvider = (props) => {

    
    const [identificacion, guardarIdentificacion] = useState({
        id: '',
        type: ''
    });
     
    const [ consultar, guardarConsultar] = useState(false);

    const [ informacion, guardarInformacion] = useState([]);

    
    console.log(informacion);

    useEffect(() => {
        if(consultar) {
            const obtenerInformacion = async () => {
                const key = "40db715f973f0a4b6b13ad0210fc78a9"
                const url = `https://api.themoviedb.org/3/${identificacion.type}/${identificacion.id}?api_key=${key}`;

                const resultado = await axios.get(url);

                // console.log(resultado.data.drinks);
                guardarInformacion(resultado.data);
             
                
            }

            obtenerInformacion();
        }
// eslint-disable-next-line
    }, [identificacion]);

    return ( 
        <InfoContext.Provider
            value={{
                identificacion,
                informacion,
                guardarIdentificacion,
                guardarConsultar
            }}
        >
            {props.children}
        </InfoContext.Provider>
     );
}
 
export default InfoProvider;