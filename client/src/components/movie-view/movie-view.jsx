import React from 'react';
import PropTypes from 'prop-types';

import Button from "react-bootstrap/Button";
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <Container className="movie-view">
        <img className="movie-poster" src={movie.ImagePath} />
        <Row className="movie-title">
          <Col className="label"><span><strong>Title: </strong></span>
            <span className="value">{movie.Title}</span></Col>
        </Row>
        <Row className="movie-description">
          <Col className="label"><span><strong>Description: </strong></span>
            <span className="value">{movie.Description}</span></Col>
        </Row>
        <Row className="movie-genre">
          <Col className="label"><span><strong>Genre: </strong></span>
            <span className="value">{movie.Genre.Name}</span></Col>
        </Row>
        <Row className="movie-director">
          <Col className="label"><span><strong>Director: </strong> </span>
            <span className="value">{movie.Director.Name}</span></Col>

        </Row>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>

        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link>
        <Link to={`/`}>
          <Button variant="link">Back</Button>
        </Link>
      </Container>
    );
  }
}
