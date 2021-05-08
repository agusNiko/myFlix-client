import React, { useState } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'



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
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  const newUser = (e) =>{
    e.preventDefault();
    console.log(username, password);
      props.onLoggedIn('newUser');
  };

  return (
    <form>

      <InputGroup hasValidation> 
      <Form.Group  controlId="formUsername">
        <Form.Label>
          Username:
        </Form.Label>
        <Form.Control  type="text" required isInvalid value={username} onChange={e => setUsername(e.target.value)} />
        <Form.Control.Feedback type="invalid">
          Please add your Username
        </Form.Control.Feedback>
      </Form.Group>
      </InputGroup>

      <InputGroup hasValidation>
      <Form.Group controlId="formPassword">
        <Form.Label>
        Password:
        </Form.Label>
        <Form.Control type="password" isInvalid required value={password} onChange={e => setPassword(e.target.value)} />
        <Form.Control.Feedback type="invalid">
          Please add your Password
        </Form.Control.Feedback>
      </Form.Group>
      </InputGroup>

      <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
      <Button variant="secondary" type="submit" onClick={newUser}>Register</Button>
    </form>
  );
}

LoginView.propType = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
};