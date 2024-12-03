import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

const LoginPage = () => {
  const handleGoogleLogin = () => {
    window.location.href = '/auth/google'; // Weiterleitung zur Authentifizierungsroute
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f2f2f2',
      }}
    >
      <Dialog.Root>
        <Dialog.Trigger
          style={{
            padding: '10px 20px',
            backgroundColor: '#4285F4',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Login mit Google
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              position: 'fixed',
              inset: 0,
            }}
          />
          <Dialog.Content
            style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '20px',
              width: '400px',
              margin: 'auto',
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Dialog.Title style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
              Login
            </Dialog.Title>
            <input
              type="email"
              placeholder="E-Mail"
              style={{
                padding: '10px',
                marginBottom: '10px',
                width: '95%',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <input
              type="password"
              placeholder="Passwort"
              style={{
                padding: '10px',
                marginBottom: '20px',
                width: '95%',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <button
              onClick={handleGoogleLogin}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 20px',
                backgroundColor: '#4285F4',
                color: '#fff',
                borderRadius: '5px',
                cursor: 'pointer',
                border: 'none',
                width: '100%',
              }}
            >
              Mit Google anmelden
            </button>
            <Dialog.Close
              style={{
                marginTop: '10px',
                display: 'block',
                textAlign: 'center',
                color: '#4285F4',
                cursor: 'pointer',
              }}
            >
              Abbrechen
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default LoginPage;
