import React, { useContext } from "react";
import { SeriesContext } from "../context/SeriesContext";
import { InfoContext } from "../context/InfoContext";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

const SeriesTrend = () => {
  const { series } = useContext(SeriesContext);

  //variables del context para realizar la consulta al hacer click
  const {
    identificacion,
    guardarIdentificacion,
    guardarConsultar,
  } = useContext(InfoContext);

  const imgUrl = "https://image.tmdb.org/t/p/w300";

  // variable para redireccionar a los resultados
  let history = useHistory();

  return (
    <Container className="mb-5">
      <h2 className="my-4">Top 20 Trending Series </h2>
      <Row>
        {series.map((serie) => (
          <Col md={3} sm={6} xs={6} key={serie.id}>
            <Card
              className="p-0 my-2"
              onClick={() => {
                guardarIdentificacion({
                  ...identificacion,
                  type: serie.media_type,
                  id: serie.id,
                });
                guardarConsultar(true);
                history.push("/info");
              }}
            >
              <Card.Img variant="top" src={imgUrl + serie.poster_path} alt={serie.original_name}/>
              <Card.Body>
                <Card.Title>{serie.original_name}</Card.Title>
                <Card.Text className="d-flex justify-content-between flex-wrap align-content-center">
                  Score:{" "}
                  {serie.vote_average >= 7 ? (
                    <span className="dot bg-success">
                      {" "}
                      {serie.vote_average}{" "}
                    </span>
                  ) : serie.vote_average < 7 && serie.vote_average >= 4 ? (
                    <span className="dot bg-warning">
                      {" "}
                      {serie.vote_average}{" "}
                    </span>
                  ) : serie.vote_average < 4 ? (
                    <span className="dot bg-danger">
                      {" "}
                      {serie.vote_average}{" "}
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

export default SeriesTrend;
