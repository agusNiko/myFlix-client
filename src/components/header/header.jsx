import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function Header(props) {

  const logout = ()=> {
    props.onLogOut()
  }
   
        return (
  
           <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
            {'myFlipapix'}
            </Navbar.Brand>
            <button onClick={logout}>Logout</button>
       
            <Link to={`/profile`}>
                    <Button variant="secondary">Profile</Button>
                </Link>

          </Navbar>
        );

}

export default Header;