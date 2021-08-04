import React, { useState, useEffect } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


function Header(props) {


  const logout = ()=> {
    props.onLogOut()
  }
  console.log('the header just rendered')
   
  return (
    <Navbar collapseOnSelect expand="lg" bg="black" variant="dark">
      <Navbar.Brand href="/">
        <h1 className="mb-3 ml-3" style={{color: "red", fontWeight:700, fontSize:"50px"}}>myFlix</h1>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      {localStorage.user && 
      <Navbar.Collapse id="responsive-navbar-nav" >
        <Nav className="justify-content-end" style={{ width: "100%" }} activeKey="/home">               
          <Link to={`/profile`}>
            <Button style={{ color: 'whitesmoke' , width: "100%" }} variant="Link">Profile</Button>
          </Link>
          
          <Link to={`/`}>
            <Button style={{ color: 'whitesmoke', width: "100%" }} variant="Link">Main View</Button>
          </Link>
          
          <Nav.Link style={{ textAlign: 'center',}} onClick={logout} >Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>}
    </Navbar>
  );
}

export default Header;