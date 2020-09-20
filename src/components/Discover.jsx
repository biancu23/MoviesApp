import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

//Context
import { DiscoverContext } from "../context/DiscoverContext";
import { InfoContext } from "../context/InfoContext";

//Bootstrap
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";


const Discover = () => {
  const {
    guardarFiltro,
    discover,
    filtro,
    categoria,
    guardarPage,
    page,
    totalpage,
  } = useContext(DiscoverContext);

  //variables del context para realizar la consulta al hacer click
  const {
    identificacion,
    guardarIdentificacion,
    guardarConsultar,
  } = useContext(InfoContext);

  // variable para redireccionar a los resultados
  let history = useHistory();

  // constante co  la url de las imagenes
  const imgUrl = "https://image.tmdb.org/t/p/w300";

  //Arreglo sort

  const sorts = [
    { name: "Popularity", value: "popularity.desc" },
    { name: "Release", value: "primary_release_date.desc" },
    { name: "Title", value: "original_title.desc" },
    { name: "Score", value: "vote_average.desc" },
  ];

  let grid;
  if (typeof discover !== "undefined") {
    grid = discover.map((discover) => (
      <Col md={3} sm={6} xs={6} key={discover.id}>
        <Card
          className="p-0 my-2"
          onClick={() => {
            guardarIdentificacion({
              ...identificacion,
              type: "movie",
              id: discover.id,
            });
            guardarConsultar(true);
            history.push("/info");
          }}
        >
          <Card.Img variant="top" src={imgUrl + discover.poster_path} />
          <Card.Body>
            <Card.Title>{discover.original_title}</Card.Title>
            <Card.Text className="d-flex justify-content-between flex-wrap align-content-center">
              Score:{" "}
              {discover.vote_average >= 7 ? (
                <span className="dot bg-success">
                  {" "}
                  {discover.vote_average}{" "}
                </span>
              ) : discover.vote_average < 7 && discover.vote_average >= 4 ? (
                <span className="dot bg-warning">
                  {" "}
                  {discover.vote_average}{" "}
                </span>
              ) : discover.vote_average < 4 ? (
                <span className="dot bg-danger"> {discover.vote_average} </span>
              ) : null}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ));
  }

  // función para leer los contenidos
  const obtenerDatos = (e) => {
    guardarFiltro({
      ...filtro,
      name: e.target.value,
    });
  };

  // definir la página anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = page - 1;

    if (nuevaPaginaActual === 0) return;

    guardarPage(nuevaPaginaActual);
    // Mover la pantalla hacia arriba
    const scroll = document.querySelector(".scroll");
    scroll.scrollIntoView({ behavior: "smooth" });
  };

  // definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = page + 1;

    if (nuevaPaginaActual > totalpage) return;

    guardarPage(nuevaPaginaActual);
    // Mover la pantalla hacia arriba
    const scroll = document.querySelector(".scroll");
    scroll.scrollIntoView({ behavior: "smooth" });
  };

  

  return (
    <Container className="mb-5 scroll">
      <Row className="d-flex justify-content-between align-items-center">
        <h2 className="my-4">{categoria}</h2>
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Sort By</Form.Label>
            <Form.Control as="select" onChange={obtenerDatos}>
              {sorts.map((sort) => (
                <option value={sort.value} key={sort.value}>
                  {sort.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Row>
      <Row>{grid}</Row>
      <Row className="d-flex justify-content-center align-items-center my-5">
        {page === 1 ? null : (
          <button
            type="button"
            className="btn btn-success mr-1"
            onClick={paginaAnterior}
          >
            &laquo; Anterior{" "}
          </button>
        )}


        {page === totalpage ? null : (
          <button
            type="button"
            className="btn btn-success"
            onClick={paginaSiguiente}
          >
            Siguiente &raquo;
          </button>
        )}
      </Row>
    </Container>
  );
};

export default Discover;
