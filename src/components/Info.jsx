import React, { useContext } from "react";
import { InfoContext } from "../context/InfoContext";

//External Components
import NumberFormat from "react-number-format";

//Local Components
import Banner from "../layout/Banner";

//Bootstrap
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const Info = () => {
  //Context con la informacion de la consulta
  const { informacion, identificacion } = useContext(InfoContext);

  //Variables con las direcciones de las imagenes
  const imgUrl = "https://image.tmdb.org/t/p/w300";
  const imgUrlBack = `https://image.tmdb.org/t/p/original${informacion.backdrop_path}`;

  //Estilo para el background
  let backFull = {
    minHeight: "100%",
    backgroundImage: "url(" + imgUrlBack + ")",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  //Validacion para obtener los generos del arreglo de genres
  let generos;
  if (informacion.genres) {
    generos = (
      <ul>
        {" "}
        {informacion.genres.map((genre) => (
          <li>{genre.name}</li>
        ))}
      </ul>
    );
  }

  //Variable con el score con el estilo de cada valor
  const score =
    informacion.vote_average >= 7 ? (
      <span className="dot bg-success"> {informacion.vote_average} </span>
    ) : informacion.vote_average < 7 && informacion.vote_average >= 4 ? (
      <span className="dot bg-warning"> {informacion.vote_average} </span>
    ) : informacion.vote_average < 4 ? (
      <span className="dot bg-danger"> {informacion.vote_average} </span>
    ) : null;

  //Variable con las ganancias con el estilo deppendiendo de las ganancias
  let revenueComponent;
  if (informacion.revenue >= informacion.budget) {
    revenueComponent = (
      <NumberFormat
        className="text-success"
        value={informacion.revenue}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    );
  } else {
    revenueComponent = (
      <NumberFormat
        className="text-danger"
        value={informacion.revenue}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    );
  }

  let infoComponent;
  if (identificacion.type === "movie") {
    infoComponent = (
      <Card border="secondary" className="contenedor-info">
        <Card.Body className="p-0">
          <Row>
            <Col
              md={4}
              sm={12}
              xs={12}
              className="d-flex justify-content-center"
            >
              <Image src={imgUrl + informacion.poster_path} />
            </Col>
            <Col md={7} sm={12} xs={12} className="mt-4 text-center">
              <Card.Title className="text-success">
                {informacion.original_title}
              </Card.Title>
              <Card.Text className="text-left text-light p-2">
                {informacion.overview}
              </Card.Text>
              <Row>
                <Col md={12}>
                  <Row>
                    <Col className="text-center text-light">
                      Status: {informacion.status}
                    </Col>
                    <Col className="text-center text-light">
                      Release: {informacion.release_date}
                    </Col>
                    <Col className="text-center text-light">
                      Duration: {informacion.runtime} min
                    </Col>
                  </Row>
                </Col>
                <Col md={12} className="my-3">
                  <Row>
                    <Col className="text-center text-light">Score: {score}</Col>
                    <Col className="text-center text-light">
                      {informacion.budget === 0 ? (
                        <p>Budget: No Data</p>
                      ) : (
                        <p>
                          Budget:{" "}
                          <NumberFormat
                            value={informacion.budget}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        </p>
                      )}
                    </Col>
                    <Col className="text-center text-light">
                      {informacion.revenue === 0 ? (
                        <p>Revenue: No Data</p>
                      ) : (
                        <p>
                          Revenue: <b>{revenueComponent}</b>{" "}
                        </p>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col className="text-left text-light">Genres: {generos}</Col>
              </Row>
              <Button
                href={informacion.homepage}
                target="_blank"
                variant="success"
                className="my-3"
              >
                Trailer
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
  if (identificacion.type === "tv") {
    infoComponent = (
      <Card border="secondary" className="contenedor-info">
        <Card.Body className="p-0">
          <Row>
            <Col
              md={4}
              sm={12}
              xs={12}
              className="d-flex justify-content-center"
            >
              <Image src={imgUrl + informacion.poster_path} />
            </Col>
            <Col md={7} sm={12} xs={12} className="mt-4 text-center">
              <Card.Title className="text-success">
                {informacion.original_name}
              </Card.Title>
              <Card.Text className="text-left text-light p-2">
                {informacion.overview}
              </Card.Text>
              <Row>
                <Col md={12}>
                  <Row>
                    <Col className="text-center text-light">
                      Release: {informacion.first_air_date}
                    </Col>
                    <Col className="text-center text-light">
                      Final: {informacion.last_air_date}
                    </Col>
                    <Col className="text-center text-light">
                      Status: {informacion.status}
                    </Col>
                  </Row>
                </Col>
                <Col md={12} className="my-3">
                  <Row>
                    <Col className="text-center text-light">Score: {score}</Col>
                    <Col className="text-center text-light">
                      Number of Episodes: {informacion.number_of_episodes}
                    </Col>
                    <Col className="text-center text-light">
                      Number of Seasons: {informacion.number_of_seasons}
                    </Col>
                  </Row>
                </Col>
                <Col className="text-left text-light">Genres: {generos}</Col>
              </Row>
              <Button
                href={informacion.homepage}
                target="_blank"
                variant="success"
                className="my-3"
              >
                Trailer
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
  console.log(Object.keys(informacion).length);

  
  return (Object.keys(informacion).length > 0 ? (
    <Container
      className="d-flex justify-content-center flex-wrap align-content-center py-5"
      style={backFull}
      fluid
    >
      <Col md={10} className="d-flex justify-content-center p-2">
        {infoComponent}
      </Col>
    </Container>
  ) : (
    <Container fluid className="p-0" >
      
      <Banner />
      <Row className="d-flex justify-content-center align-items-center">
        <Col sm={8} xs={8} style={{ height: '60%'}} className="p-3 ">
          <Alert variant="success" >
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
            <p>
              Aww yeah, you successfully read this important alert message. This
              example text is going to run a bit longer so that you can see how
              spacing within an alert works with this kind of content.
            </p>
            <hr />
            <p className="mb-0">
              Whenever you need to, be sure to use margin utilities to keep
              things nice and tidy.
            </p>
          </Alert>
        </Col>
      </Row>
    </Container>
  )
  )
};

export default Info;
