import React, { useState } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'

import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import { Link } from "react-router-dom";


export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://myflapix.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
      window.open('/', '_self');
    })
    .catch(e => {
      console.log('no such user');
      alert('Username or Password incorrect')
    });
  };

  console.log('log in view just rendered')

  return (

    <Container className="login-view mt-4">
      
      <Row >
        <Col></Col>
        <Col sm={8} lg={4}>
          <Form className="login was-validated" noValidate >
            <Form.Group  controlId="formUsername">
              <Form.Label className="mb-3" style={{color: "white", fontWeight:700, fontSize:"32px"}}>
                Sign In
              </Form.Label>
              <Form.Control  
                required
                type="text" 
                maxLength={20}
                minLength={5}
                placeholder="Username" 
                value={username} 
                onChange={e => setUsername(e.target.value)} />
              <Form.Control.Feedback type="valid">
                awesome!
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Enter your Username!
              </Form.Control.Feedback>
            </Form.Group>
                
              <Form.Group controlId="formPassword">
                <Form.Control 
                  required 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} />
                <Form.Control.Feedback type="valid">
                  awesome!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Enter your Password!
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
        </Col>
        <Col>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col></Col>
        <Col sm={8} lg={4}>
          <Button variant="danger" type="submit" onClick={handleSubmit} style={{width:"100%"}}>Sign In</Button>
        </Col>
        <Col></Col>
      </Row>
      <Row className="mt-4 justify-content-md-center">
              
         <p style={{color:"#737374", padding: "8px"}} >New to myFlix?</p>
 
          <Link className="" to={`/register`}>
            <Button  variant="link" type="submit" style={{color:"white", fontWeight:600, width: "100%"}}>Sign Up Now!</Button>
          </Link>

      </Row>


    </Container>

  );
}

LoginView.propType = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
};


