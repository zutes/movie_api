// client/src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';

// The two most important lines in the code above are import { MainView } from './main-view/main-view'; and return <MainView/>;.
// These commands render MainView from within your “index.jsx” file

import { MainView } from './components/main-view/main-view';

// Import statement to indicate that we need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return <MainView/>;
  }
}

// Find the root of our app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render our app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);