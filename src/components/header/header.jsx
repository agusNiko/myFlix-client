import React, { useState, useEffect } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function Header(props) {


  const logout = ()=> {
    props.onLogOut()
  }
  console.log(localStorage.user)
   
        return (
        
           <Navbar bg="dark" variant="dark" className="color-nav">
            <Navbar.Brand href="#home">
            {'myFlipapix'}
            </Navbar.Brand>
            
            {localStorage.user && 
            <Nav className="mr-auto">
            
            <Link to={`/profile`}>
                    <Button style={{ color: 'whitesmoke' }} variant="Link">Profile</Button>
            </Link>
           
          
            <Link to={`/`}>
                    <Button style={{ color: 'whitesmoke' }} variant="Link">Main View</Button>
            </Link>
            
  
             <Button  style={{ color: 'whitesmoke' }} variant="Link" onClick={logout}>Logout</Button>
           
            </Nav>}
          </Navbar>
        );
}

export default Header;