import React, { useState } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'

import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';



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



  return (

    <Container className="login-view">
    <Row >
        <Form className="login was-validated" noValidate >
            <Form.Group  controlId="formUsername">
              <Form.Label>
                Username:
              </Form.Label>
              <Form.Control  
              required
              type="text" 
              maxLength={20}
              minLength={5}
              placeholder="Enter username" 
              value={username} 
              onChange={e => setUsername(e.target.value)} />
            <Form.Control.Feedback type="valid">
              awesome you did it!
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              This field is mandatory!
            </Form.Control.Feedback>
          </Form.Group>
    
          <InputGroup hasValidation>
      <Form.Group controlId="formPassword">
        <Form.Label>
        Password:
        </Form.Label>
        <Form.Control 
          required 
          type="password" 
          placeholder="Enter your Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} />
       <Form.Control.Feedback type="valid">
          awesome you did it!
        </Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          This field is mandatory too!
        </Form.Control.Feedback>
      </Form.Group>
      </InputGroup>
          </Form>
    </Row>

    <Row>
        <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
      <Link to={`/register`}>
        <Button  variant="secondary" type="submit">Register</Button>
     </Link>
    </Row>
</Container>
  //   <form>

 


  //     <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>



  //     <Link to={`/register`}>
  //       <Button  variant="secondary" type="submit">Register</Button>
  //     </Link>


  //   </form>

  );
}

LoginView.propType = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
};