import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import * as Dialog from "@radix-ui/react-dialog";

const LoginPage = ({ onLoginSuccess }) => {
  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Login erfolgreich:", credentialResponse);
    console.log("credentialResponse Inhalt:", JSON.stringify(credentialResponse)); // Zeigt alle Details

    if (credentialResponse && credentialResponse.credential) {
      const token = credentialResponse.credential;
      const userData = parseJwt(token);
      
      // Überprüfen, ob die Felder `name` und `email` im Decoded-Token existieren
      if (userData && userData.name && userData.email) {
        const user = {
          token: credentialResponse.credential, // Google ID-Token
          name: userData.name, // Extraktion des Namens
          email: userData.email,  // Extraktion der E-Mail-Adresse
        };

        // Speichern der Benutzerdaten im localStorage
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Dekodierte Daten:", userData);
        console.log("Eingeloggt ist:", user.email);
        
        // Übergabe der Benutzerdaten an die App-Komponente
        onLoginSuccess(user);
      } else {
        console.error("Benutzerdaten fehlen im Token:", userData);
      }
    } else {
      console.error("Fehler beim Abrufen der Benutzerdaten", credentialResponse);
    }
  };

  // Funktion zum Dekodieren des ID-Tokens (JWT)
  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload); // Gibt die JSON-Daten zurück
  }

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
              <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginError} 
              scope="profile email"/>
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
