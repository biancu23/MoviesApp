import React, { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { InfoContext } from "../context/InfoContext";
import { useHistory } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";


const Grid = () => {
  const { searchs } = useContext(SearchContext);

 
  const imgUrl = "https://image.tmdb.org/t/p/w400";


  //variables del context para realizar la consulta al hacer click 
  const { identificacion, guardarIdentificacion, guardarConsultar} = useContext(InfoContext);

  

  // variable para redireccionar a los resultados
  let history = useHistory();

  return (
    <Container fluid>
      <Row className="mb-5">
      <h2 className="my-4">Search Results</h2>
      </Row>
      <Container className="mb-5">
        <Row className="d-flex flex-wrap">
          {searchs.map((search) =>
            search.media_type === "movie" ? (
              <Col className="col-md-3 col-6 mb-2 " key={search.id}>
                <Card className="col-12 p-0" onClick={() => {
            guardarIdentificacion({
                ...identificacion,
                type : search.media_type,
                id : search.id
            });
            guardarConsultar(true);
            history.push('/info');
          } }>
                  <Card.Img
                    variant="top"
                    src={
                      search.poster_path
                        ? imgUrl + search.poster_path
                        : "https://dummyimage.com/253x380/343a40/fff.png&text=Image+not+Found"
                    }
                  />
                  <Card.Body>
                    <Card.Text>{search.original_title}</Card.Text>
                    <Card.Text>
                      Movie Score:{" "}
                      {search.vote_average >= 7 ? (
                        <span className="dot bg-success">
                          {" "}
                          {search.vote_average}{" "}
                        </span>
                      ) : search.vote_average < 7 &&
                        search.vote_average >= 4 ? (
                        <span className="dot bg-warning">
                          {" "}
                          {search.vote_average}{" "}
                        </span>
                      ) : search.vote_average < 4 ? (
                        <span className="dot bg-danger">
                          {" "}
                          {search.vote_average}{" "}
                        </span>
                      ) : null}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ) : search.media_type === "tv" ? (
              <Col className="col-md-3 col-6 mb-2" key={search.id}>
                <Card className="col-12 p-0" onClick={() => {
            guardarIdentificacion({
                ...identificacion,
                type : search.media_type,
                id : search.id
            });
            guardarConsultar(true);
            history.push('/info');
          } }>
                  <Card.Img
                    variant="top"
                    src={
                      search.poster_path
                        ? imgUrl + search.poster_path
                        : "https://dummyimage.com/253x380/343a40/fff.png&text=Image+not+Found"
                    }
                  />
                  <Card.Body>
                    <Card.Text>{search.original_name}</Card.Text>
                    <Card.Text>
                      Serie Score:{" "}
                      {search.vote_average >= 7 ? (
                        <span className="dot bg-success">
                          {" "}
                          {search.vote_average}{" "}
                        </span>
                      ) : search.vote_average < 7 &&
                        search.vote_average >= 4 ? (
                        <span className="dot bg-warning">
                          {" "}
                          {search.vote_average}{" "}
                        </span>
                      ) : search.vote_average < 4 ? (
                        <span className="dot bg-danger">
                          {" "}
                          {search.vote_average}{" "}
                        </span>
                      ) : null}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ) : null
          )}
        </Row>
      </Container>
    </Container>
  );
};

export default Grid;
