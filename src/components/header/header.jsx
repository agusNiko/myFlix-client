import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import Navbar from 'react-bootstrap/Navbar';

function Header() {

  const loggedOut = () => {
    props.onLoggedOut()

  }
   
        return (
           <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
            {'myFlipapix'}
            </Navbar.Brand>
            <button onClick={loggedOut}>Logout</button>
            <br/>
          </Navbar>
        );

}

export default Header;