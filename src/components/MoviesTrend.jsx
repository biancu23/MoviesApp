import React, { useContext } from "react";
import { MoviesContext } from "../context/MoviesContext";
import { InfoContext } from "../context/InfoContext";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

const MoviesTrend = () => {
  //movies viene del context con la lista de las peliculas
  const { movies } = useContext(MoviesContext);

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

  return (
    <Container className="mb-5">
      <h2 className="my-4">Top 20 Trending Movies</h2>
      <Row>
        {movies.map((movie) => (
          <Col md={3} sm={6} xs={6} key={movie.id}>
            <Card
              className="p-0 my-2"
              onClick={() => {
                guardarIdentificacion({
                  ...identificacion,
                  type: movie.media_type,
                  id: movie.id,
                });
                guardarConsultar(true);
                history.push("/info");
              }}
            >
              <Card.Img variant="top" src={imgUrl + movie.poster_path} alt={movie.original_title}/>
              <Card.Body>
                <Card.Title>{movie.original_title}</Card.Title>
                <Card.Text className="d-flex justify-content-between flex-wrap align-content-center">
                  Score:{" "}
                  {movie.vote_average >= 7 ? (
                    <span className="dot bg-success">
                      {" "}
                      {movie.vote_average}{" "}
                    </span>
                  ) : movie.vote_average < 7 && movie.vote_average >= 4 ? (
                    <span className="dot bg-warning">
                      {" "}
                      {movie.vote_average}{" "}
                    </span>
                  ) : movie.vote_average < 4 ? (
                    <span className="dot bg-danger">
                      {" "}
                      {movie.vote_average}{" "}
                    </span>
                  ) : null}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MoviesTrend;
