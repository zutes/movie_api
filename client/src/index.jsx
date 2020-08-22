// client/src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';

//import Redux and React Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';

/* The two most important lines in the code below are import { MainView } from './main-view/main-view'; and return <MainView/>;.
These commands render MainView from within your “index.jsx” file.*/

import MainView from './components/main-view/main-view';

//This imports the reducer you just wrote (remember: it takes a state and an action and returns a new state).
import moviesApp from './reducers/reducers';

// Import statement to indicate that we need to bundle `./index.scss`
import './index.scss';

/*This creates the store using createStore and wraps your entire app in a provider that comes from React Redux.
That way, your store will be accessible from your entire app.*/
const store = createStore(moviesApp);

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

// Find the root of our app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render our app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);