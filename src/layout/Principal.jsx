import React, { Fragment } from "react";

import Container from "react-bootstrap/Container";
import Banner from "./Banner";
import MovieList from "../components/MovieList";
import SeriesList from "../components/SeriesList";


const Principal = () => {
  return (
      <Fragment>
    <Banner/>
    <Container fluid>
        
      <h2>Trending Movies</h2>
      <MovieList/>

      <h2>Trending Series</h2>
      <SeriesList />
      
    </Container>
    </Fragment>
  );
};

export default Principal;
