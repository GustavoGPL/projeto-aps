import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import './App.css';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const handleLogout = () => {
    setIsUserLoggedIn(false);
  }

  return (
    <div className="App">
      <div className="container">
        <div className="content">
          {!isUserLoggedIn && (
            <div className="login-container">
              <div className="login-title">Login:</div>
              <GoogleOAuthProvider clientId="51153627717-nrn15rf5eoos3a1rf775t660sseoqv0g.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    console.log('Credential Response:', credentialResponse);
                    setIsUserLoggedIn(true);
                    var decoded = jwt_decode(credentialResponse.credential);
                    console.log('Decoded:', decoded);
                    setUserData(decoded);
                  }}
                  onError={() => {
                    setIsUserLoggedIn(false);
                    console.error("Login falhou");
                  }}
                />
              </GoogleOAuthProvider>
            </div>
          )}
          {isUserLoggedIn && (
            <div className='userContainer'>
              <div className='userImage'>
                <img src={userData.picture} alt="User" />
              </div>
              <div>{userData.name.toUpperCase()}</div>
              <div>{userData.email}</div>
              <p>
                <button onClick={handleLogout}>Logout</button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
