import React from 'react';
import ReactDOM from 'react-dom';

import { Container } from 'react-bootstrap';


import { devToolsEnhancer } from 'redux-devtools-extension';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';

import MainView from './components/main-view/main-view' //if you want to get rid of the curly braces, simply add 'default' right after export in "main-view.jsx"

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
    <Provider store={store}>
      <Container fluid style={{height: "100vh", marginTop: "0px"}}>
        <MainView/>
      </Container>
    </Provider>  
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);