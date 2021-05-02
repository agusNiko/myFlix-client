import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ email, setEmail] = useState('');
    const [ Birthday, setBirthday ] = useState('');


    const handleSubmit = (e) => {
     e.preventDefault();
        console.log(username, password, confirmPassword, email, Birthday); //
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onRegistration(null);
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

<Form.Group controlId="formConfirmPassword">
  <Form.Label>
  Confirm Password:
  </Form.Label>
  <Form.Control type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
</Form.Group>


<Form.Group controlId="formBirthday">
  <Form.Label>
  Birthday:
  </Form.Label>
  <Form.Control type="Birthday" value={Birthday} onChange={e => setBirthday(e.target.value)} />
</Form.Group>


<Form.Group controlId="formEmail">
  <Form.Label>
  Email: 
  </Form.Label>
  <Form.Control type="Email" value={Birthday} onChange={e => setEmail(e.target.value)} />
</Form.Group>
     
<Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
</form>

);
}

RegistrationView.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };












// <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
// <Button variant="secondary" type="submit" onClick={newUser}>Register</Button>
