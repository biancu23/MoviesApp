import React, {useState, useContext} from 'react';
import {SearchContext} from '../context/SearchContext';
import { useHistory } from "react-router-dom";
import Error from "../components/Error";
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Banner = () => {

  const [ busqueda, guardarBusqueda ] = useState({
    search: ''
});

const { buscarResults, guardarConsultar } = useContext(SearchContext );
const [error, guardarError] = useState(false);


// función para leer los contenidos
const obtenerDatosBusqueda = e => {
  guardarBusqueda({
      ...busqueda,
      [e.target.name] : e.target.value
  })
}

let history = useHistory();

    return ( 
    <Jumbotron fluid>
        <Container >
          <h1 className="text-light">Search movies & series</h1>
          {error ? <Error mensaje="Agrega un termino de busqueda" /> : null}
          <Form className="col-sm-12 d-flex justify-content-center" inline onSubmit={ e => {
                e.preventDefault();
                if (busqueda.search.trim() === "") {
                  
                  guardarError(true);
                  return;
                }
                guardarError(false);
                buscarResults(busqueda);
                guardarConsultar(true);
                history.push('/results');
            }}>
        <FormControl type="text" placeholder="Search"  className="col-sm-6" name="search" onChange={obtenerDatosBusqueda}/>
        <Button type="submit" variant="success" >Search</Button>
      </Form>
        </Container>
      </Jumbotron>
       );
}
 
export default Banner;