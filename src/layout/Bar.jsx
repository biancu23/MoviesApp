import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

//Context
import { SearchContext } from "../context/SearchContext";
import { DiscoverContext } from "../context/DiscoverContext";

//Media
import Logo from "../images/logo.png";

//Bootstrap
import Error from "../components/Error";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const Bar = () => {
  const [busqueda, guardarBusqueda] = useState({
    search: "",
  });

  const { buscarResults, guardarConsultar } = useContext(SearchContext);

  const { guardarGenre, guardarCategoria } = useContext(DiscoverContext);

  const [error, guardarError] = useState(false);

  // función para leer los contenidos
  const obtenerDatosBusqueda = (e) => {
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  const genres = [
    { name: "Action", id: 28},
    { name: "Adventure", id: 12},
    { name: "Animation", id: 16},
    { name: "Comedy", id: 35},
    { name: "Crime", id: 80},
    { name: "Documentary", id: 99},
    { name: "Drama", id: 18},
    { name: "Family", id: 10751},
    { name: "Fantasy", id: 14},
    { name: "History", id: 36},
 
  ];

  const genres2 = [

    { name: "Horror", id: 27},
    { name: "Music", id: 10402},
    { name: "Mystery", id: 9648},
    { name: "Romance", id: 10749},
    { name: "Science Fiction", id: 878},
    { name: "TV Movie", id: 10770},
    { name: "Thriller", id: 53},
    { name: "War", id: 10752},
    { name: "Western", id: 37},
  ]
  let history = useHistory();

  return (
    <Navbar bg="dark" expand="lg" sticky="top" variant="dark">
      <Link to={"/"}>
        <img
          src={Logo}
          width="40"
          height="30"
          className="d-inline-block align-top"
          alt="logo app"
        />
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
       <Nav className="mr-auto">
         
          <Nav.Link href="/movies-trend">Movies</Nav.Link>
          <Nav.Link href="/series-trend">Series</Nav.Link>
          <NavDropdown title="Genres" id="basic-nav-dropdown">
            <Row>
              <Col sm={5}  xs={5}className="px-2">
                {genres.map((genre) => (
                  <NavDropdown.Item href="#!" id={genre.id} key={genre.id} onClick={(e) => {
                    e.preventDefault();
                    guardarGenre(genre.id);
                   
                    guardarCategoria(genre.name);
                    history.push("/discover");
                  }}>
                    {genre.name}
                  </NavDropdown.Item>
                ))}
              </Col>
              <Col sm={6} xs={5}>
                {genres2.map((genre) => (
                  <NavDropdown.Item href="#!" id={genre.id} key={genre.id} onClick={(e) => {
                    e.preventDefault();
                    guardarGenre(genre.id);
                   
                    guardarCategoria(genre.name);
                    history.push("/discover");
                  }}>
                    {genre.name}
                  </NavDropdown.Item>
                ))}
              </Col>
            </Row>
          </NavDropdown>
        </Nav>
        <Form
          inline
          onSubmit={(e) => {
            e.preventDefault();
            if (busqueda.search.trim() === "") {
              guardarError(true);
              return;
            }
            guardarError(false);
            buscarResults(busqueda);
            guardarConsultar(true);
            history.push("/results");
          }}
        >
          {error ? <Error mensaje="Agrega un termino de busqueda" /> : null}
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            name="search"
            onChange={obtenerDatosBusqueda}
          />

          <Button variant="outline-success" type="submit">
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Bar;
