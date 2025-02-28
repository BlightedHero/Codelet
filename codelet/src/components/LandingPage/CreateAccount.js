import React, { useState } from 'react';
import './CreateAccount.css';

function UserCreation() {
  const [inputUsername, setInputText] = useState('');
  const [inputPassword, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const [message, setMessage] = useState('');
  const [currType, changeType] = useState('student');

  const apiURL = 'http://localhost:8080/';

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    if (inputPassword !== reenterPassword) {
      setMessage("Re-entered password doesn't match!");
      return;
    }

    try {
      const response = await fetch(apiURL + currType + 's/account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: inputUsername, password: inputPassword }),
      });
      if (!response.ok) {
      	if (response.status == 400) {
      		throw new Error("Username Already Exists");
      	}
        throw new Error("Create Account Failed");
      }
      setMessage('Account successfully created');
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
        <img src="logo.png" alt="Codelet" /> {/* <-- currently no logo image to use, but if we add it it should be in /src*/}
      </header>
      <div className="form-container">
        <div className="tabs">
          <button
            className={currType === 'student' ? 'active' : ''}
            onClick={() => toggleAccType('student')}
          >
            Student
          </button>
          <button
            className={currType === 'researcher' ? 'active' : ''}
            onClick={() => toggleAccType('researcher')}
          >
            Researcher
          </button>
        </div>
        <h2>Create {currType} Account</h2>
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
            <label htmlFor="repassword">Re-Enter Password:</label>
            <input
              id="repassword"
              type="password"
              value={reenterPassword}
              onChange={(event) => setReenterPassword(event.target.value)}
              placeholder="Re-enter your password"
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Account" />
          </div>
          {message && <p>{message}</p>}
          <div className="form-group">
            <a href="/sign-in">Have an account? Sign in</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserCreation;
