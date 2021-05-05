import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  const newUser = (e) =>{
    e.preventDefault();
    console.log(username, password);
      props.onLoggedIn('newUser');
  };

  return (
    <form>
      <Form.Group controlId="formUsername">
        <Form.Label>
          Username:
        </Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>
        Password:
        </Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
      
      </Form.Group>
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