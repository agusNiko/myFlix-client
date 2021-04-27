import React, { useState } from 'react';


export function RegistrationView(prop) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ email, setEmail] = useState('');
    const [ Birthday, setBirthday ] = useState('');


    const handleSubmit = () => {
       // e.preventDefault();
        console.log(username, password, confirmPassword, email, Birthday); //
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onRegistration(null);
      };



return (
    <form>
        <label>
            Username: 
            <input type="tex" value={username} onChange={e=> setUsername(e.target.value)}/>
        </label>
        <label>
             Password: 
            <input type="tex" value={password} onChange={e=> setPassword(e.target.value)}/>
        </label>
        <label>
            Confirm password: 
            <input type="tex" value={confirmPassword} onChange={e=> setConfirmPassword(e.target.value)}/>
        </label>
        <label>
            Email: 
            <input type="Email" value={email} onChange={e=> setEmail(e.target.value)}/>
        </label>
        <label>
            Birthday: 
            <input type="Birthday" value={Birthday} onChange={e=> setBirthday(e.target.value)}/>
        </label>
            <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
);
}
