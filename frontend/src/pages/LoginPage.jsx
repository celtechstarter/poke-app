/*import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import * as Dialog from "@radix-ui/react-dialog";

const LoginPage = ({ onLoginSuccess }) => {
  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Login erfolgreich:", credentialResponse);
    const user = { token: credentialResponse.credential }; // Token speichern
    localStorage.setItem("user", JSON.stringify(user)); // Speichere Benutzerinformationen
    onLoginSuccess(user); // Authentifizierung aktivieren
  };

  const handleGoogleLoginError = () => {
    console.error("Login fehlgeschlagen");
  };


  
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f2f2f2",
        }}
      >
        <Dialog.Root>
          <Dialog.Trigger
            style={{
              padding: "10px 20px",
              backgroundColor: "#4285F4",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Login mit Google
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                position: "fixed",
                inset: 0,
              }}
            />
            <Dialog.Content
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                padding: "20px",
                width: "400px",
                margin: "auto",
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Dialog.Title style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>
                Login mit Google
              </Dialog.Title>
              <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginError} />
              <Dialog.Close
                style={{
                  marginTop: "10px",
                  display: "block",
                  textAlign: "center",
                  color: "#4285F4",
                  cursor: "pointer",
                }}
              >
                Abbrechen
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
*/

import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import * as Dialog from "@radix-ui/react-dialog";
import "./LoginPage.css";

const LoginPage = ({ onLoginSuccess }) => {
  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Login erfolgreich:", credentialResponse);
    const user = { token: credentialResponse.credential }; // Token speichern
    localStorage.setItem("user", JSON.stringify(user)); // Speichere Benutzerinformationen
    onLoginSuccess(user); // Authentifizierung aktivieren
  };

  const handleGoogleLoginError = () => {
    console.error("Login fehlgeschlagen");
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="login-container">
        <Dialog.Root>
          <Dialog.Trigger className="login-button">
            Login mit Google
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="dialog-overlay" />
            <Dialog.Content className="dialog-content">
              <Dialog.Title className="dialog-title">
                Login mit Google
              </Dialog.Title>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
              />
              <Dialog.Close asChild>
                <a href="#" className="dialog-close">Abbrechen</a>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
