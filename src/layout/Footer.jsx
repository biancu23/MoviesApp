import React from "react";

import Navbar from 'react-bootstrap/Navbar';
import MovieDB from '../images/moviedb.png'

const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="https://developers.themoviedb.org/3/getting-started/introduction">
        <img
          src={MovieDB}
          width="200"
          className="d-inline-block align-top"
          alt="The movieDB"
        />
      </Navbar.Brand>
    </Navbar>
  );
};

export default Footer;
