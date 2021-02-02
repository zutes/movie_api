import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

import Col from 'react-bootstrap/Row';
import Row from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


/*The first argument, mapStateToProps, is a function that converts or transforms the store into props that the MoviesList
component will use. Remember that the store contains your application's state, which is why this function is called mapStateToProps.*/
/*In the mapStateToProps function, you extracted visibilityFilter into a prop named visibilityFilter. This means that MoviesList's props
contains two properties (the second being movies, which was passed when the component was instantiated in the render() method of the MainView component).
Now, you can filter the array movies based on the value present in visibilityFilter, then render the filtered array into a list of MovieCard components.*/
const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

/**
 * Lets users filter list of movies
 * @function MoviesList
 * @param {*} props 
 */
function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
  }

  if (!movies) return <div className="main-view" />;

  return (
    <div className="movies-list">
      <Container>
        <Row>
          <Col>
            <VisibilityFilterInput visibilityFilter={visibilityFilter} />
            {filteredMovies.map((m) => (
              <MovieCard key={m._id} movie={m} />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default connect(mapStateToProps)(MoviesList);

/*With the code above, you've added the import statement to use your new VisibilityFilterInput component,
and you've added it in what's returned by the component. Your application now has an input to filter any movie
that isn't tied to its parent containers. This means you can remove the VisibilityFilterInput component from this
view and add it elsewhere; nothing else will need to be modified for the app to continue working properly.*/

//Let’s examine how users will use the filtering options:
//1-The user sees a list of movies in the main view.
//2-The user types a string into the visibility filter input you’re going to write (it's just a text input wired to the store through
//    actions that changes the visibilityFilter value).
//3-The store is notified of this change through the dispatcher and notifies its listening views.
//4-The listening views update themselves if necessary based on the new visibilityFilter value received from the store through React Redux.
