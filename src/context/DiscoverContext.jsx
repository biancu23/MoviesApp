import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DiscoverContext = createContext();

const DiscoverProvider = (props) => {
  //Bar.jsx
  const [genre, guardarGenre] = useState("28");
  const [categoria, guardarCategoria] = useState("Action");
  const [page, guardarPage] = useState(1);
  const [totalpage, guardarTotalPage] = useState("");

  //Discover.jsx
  const [discover, guardarDiscover] = useState([]);
  const [filtro, guardarFiltro] = useState({
    name: "popularity.desc",
  });

  useEffect(() => {
    const obtenerDiscover = async () => {
      const key = "40db715f973f0a4b6b13ad0210fc78a9";
      const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&sort_by=${filtro.name}&vote_count.gte=25&page=${page}&api_key=${key}`;

      const resultado = await axios.get(url);

      guardarDiscover(resultado.data.results);
      guardarTotalPage(resultado.data.total_pages);

      
    };

    obtenerDiscover();
    
    // eslint-disable-next-line
  }, [genre, filtro, page]);

  return (
    <DiscoverContext.Provider
      value={{
        filtro,
        genre,
        discover,
        categoria,
        page,
        totalpage,
        guardarPage,
        guardarGenre,
        guardarCategoria,
        guardarFiltro,
      }}
    >
      {props.children}
    </DiscoverContext.Provider>
  );
};

export default DiscoverProvider;
