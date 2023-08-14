import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import './App.css'
 

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const handleLogout = () => {
    setIsUserLoggedIn(false);
  }

  return (
    <>
      <div className="App">
        Login:
      </div>
      <GoogleOAuthProvider clientId="51153627717-up3hkq5sdrqn5k6l4pvc3doavdf1crse.apps.googleusercontent.com">
      {
        isUserLoggedIn ? "" :
        <GoogleLogin
        onSuccess={credentialResponse => {
          setIsUserLoggedIn(true);
          var decoded = jwt_decode(credentialResponse.credential);
          console.log(decoded)
          setUserData(decoded);
        }}
        onError={() => {
          setIsUserLoggedIn(false)
          console.log('Login Failed');
        }}
      />
      }
      </GoogleOAuthProvider>
      {
        isUserLoggedIn ?
        <div className='userContainer'>
          <div className='userImage'>
            <img src={userData.picture}/>
          </div>
          <div>{userData.email}</div>
          <p>
            <button onClick={handleLogout}>Logout</button>
          </p>
        </div>
        :
        ''
      }
    </>
    
  );
}

export default App;
