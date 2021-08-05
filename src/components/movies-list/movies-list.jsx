import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input'
import { MovieCard } from '../movie-card/movie-card';



const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view"/>;

 return <>
  <Row className="mt-3">
  <Col></Col>
    <Col md={4} >
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </Col>
    <Col></Col>
  </Row>
  <Row className="mt-3">
    {filteredMovies.map(m => (
    <Col  lg={3} md={4} sm={6} xs={12} key={m._id}>
      <MovieCard movieData={m} />
    </Col>
  ))}
  </Row>
  </>
}

export default connect(mapStateToProps)(MoviesList);