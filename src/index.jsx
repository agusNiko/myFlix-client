import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view' //if you want to get rid of the curly braces, simply add 'default' right after export in "main-view.jsx"
import Container from 'react-bootstrap/Container';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
    
    <Container fluid>
      <MainView />
    </Container>
        
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);