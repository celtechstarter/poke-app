import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const LoginPage = ({ onLoginSuccess }) => {
  const handleLoginSuccess = (credentialResponse) => {
    console.log('Login erfolgreich:', credentialResponse);
    const user = { token: credentialResponse.credential }; // Token speichern
    onLoginSuccess(user); // Authentifizierung aktivieren
  };

  const handleLoginError = () => {
    console.error('Login fehlgeschlagen');
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h1>Willkommen bei der Pokémon Card Scanner App</h1>
        <p>Bitte melden Sie sich an, um fortzufahren</p>
        <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
