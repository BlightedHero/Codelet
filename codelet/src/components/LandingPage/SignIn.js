import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccount.css';

const apiURL = 'http://localhost:8080';

async function fetchID(type, username) {
	try {
		const response = await fetch(apiURL+type+'/id/'+username, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		});
		if (!response.ok) {
			throw new Error('Failed to get ID: '+response.status);
		}
		const student_id = await response.json();
		return student_id;
	} catch (error) {
		throw error;
	}
};

async function fetchLogin(type, username, password) {
	try {
		const response = await fetch(apiURL+type+'/login', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({username: username, password:password})
		});
		if (!response.ok) {
			throw new Error('Failed to sign in: '+response.status);
		}
		const token = await response.json();
		return token;
	} catch (error) {
		throw error;
	}
};

function SignIn() {
	const [inputUsername, setInputText] = useState('');
  	const [inputPassword, setPassword] = useState('');
  	const [token, setToken] = useState('');
  	const [message, setMessage] = useState('');
  	const [currType, changeType] = useState('/students');

  	const navigate = useNavigate();

  	const handleChange = (event) => {
    	setInputText(event.target.value);
  	};

  	const handleSubmit = async() => {
  		try {
      		setToken(await fetchLogin(currType, inputUsername, inputPassword));

			const student_id = await fetchID(currType, inputUsername);
        	navigate(currType+'/'+student_id+'/Home');
      	} catch (error) {
        	console.error('Error:', error);
        	setMessage(error.message);
      	}
  	};

  const toggleAccType = (type) => {
    changeType(type);
  };

  return (
    <div className="container">
      <header>
        <img src="logo.png" alt="Codelet" /> { /*add logo to src */ }
      </header>
      <div className="form-container">
        <div className="tabs">
          <button
            className={currType === '/students' ? 'active' : ''}
            onClick={() => toggleAccType('/students')}
          >
            Student
          </button>
          <button
            className={currType === '/researchers' ? 'active' : ''}
            onClick={() => toggleAccType('/researchers')}
          >
            Researcher
          </button>
        </div>
        <h2>Sign in to {currType} Account</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="form-group">
            <label htmlFor="username">User Name:</label>
            <input
              id="username"
              type="text"
              value={inputUsername}
              onChange={handleChange}
              placeholder="Enter a username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={inputPassword}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter a password"
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Log in" />
          </div>
          {message && <p>{message}</p>}
          <div className="form-group">
            <a href="/">Don't have an account? Create account</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
