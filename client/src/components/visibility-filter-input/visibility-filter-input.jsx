import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

/*As you can see, there's nothing much new here. You created a new function component (it has no state and doesn’t need lifecycle hooks,
  so you don’t need a class component) that's basically a wrapper around a React Bootstrap text input (a.k.a. Form.Control) and connected
  it to the store using the connect() function. Notice that it already has visibilityFilter in its props. This is because you’ll be passing
  the same visibilityFilter prop you have in the MoviesList component—something only possible because the VisibilityFilterInput component you
  just created will be used as a sub-component of MoviesList:*/

function VisibilityFilterInput(props) {
  return <Form.Control
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder="filter"
  />;
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);