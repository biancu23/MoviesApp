import React from "react";
import Alert from "react-bootstrap/Alert";

const Error = () => {
  //Toma el mensaje  que viende desde el formulario con el erro
  return (
    <Alert className="mx-3 my-1 p-1 text-center " variant="danger">
      <b> La busqueda no puede estar vacia </b>
    </Alert>
  );
};

export default Error;
