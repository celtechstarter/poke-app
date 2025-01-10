import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "./LoginPage.css";

const LoginPage = () => {
  const handleGoogleLogin = () => {
    // Dynamische Backend-URL aus Umgebungsvariablen
    const loginURL = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
    window.location.href = loginURL; // Weiterleitung zum Backend
  };

  return (
    <div className="login-container">
      <Dialog.Root>
        <Dialog.Trigger className="login-button">
          Login mit Google
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-content">
            <Dialog.Title className="dialog-title">Login mit Google</Dialog.Title>
            <button
              onClick={handleGoogleLogin}
              className="dialog-button google-login-button"
            >
              Login mit Google
            </button>
            <Dialog.Close asChild>
              <button className="dialog-button">Abbrechen</button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default LoginPage;



//Alte Logik für das Login mit Google
// import React from "react";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import * as Dialog from "@radix-ui/react-dialog";
// import "./LoginPage.css";

// const LoginPage = ({ onLoginSuccess }) => {
//   const handleGoogleLoginSuccess = (credentialResponse) => {
//     console.log("Login erfolgreich:", credentialResponse);
//     console.log("credentialResponse Inhalt:", JSON.stringify(credentialResponse)); // Zeigt alle Details

//     if (credentialResponse && credentialResponse.credential) {
//       const token = credentialResponse.credential;
//       const userData = parseJwt(token);
      
//       // Überprüfen, ob die Felder `name` und `email` im Decoded-Token existieren
//       if (userData && userData.name && userData.email) {
//         const user = {
//           token: credentialResponse.credential, // Google ID-Token
//           name: userData.name, // Extraktion des Namens
//           email: userData.email,  // Extraktion der E-Mail-Adresse
//         };

//         // Speichern der Benutzerdaten im localStorage
//         localStorage.setItem("user", JSON.stringify(user));
//         console.log("Dekodierte Daten:", userData);
//         console.log("Eingeloggt ist:", user.email);
        
//         // Übergabe der Benutzerdaten an die App-Komponente
//         onLoginSuccess(user);
//       } else {
//         console.error("Benutzerdaten fehlen im Token:", userData);
//       }
//     } else {
//       console.error("Fehler beim Abrufen der Benutzerdaten", credentialResponse);
//     }
//   };

//   // Funktion zum Dekodieren des ID-Tokens (JWT)
//   function parseJwt(token) {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload); // Gibt die JSON-Daten zurück
//   }

//   const handleGoogleLoginError = () => {
//     console.error("Login fehlgeschlagen");
//   };

//   return (
//     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
//       <div className="login-container">
//         <Dialog.Root>
//           <Dialog.Trigger className="login-button">
//             Login mit Google
//           </Dialog.Trigger>
//           <Dialog.Portal>
//             <Dialog.Overlay className="dialog-overlay" />

//             <Dialog.Content className="dialog-content">
//               <Dialog.Title className="dialog-title">
//                 Login mit Google
//               </Dialog.Title>
//               <GoogleLogin
//                 onSuccess={handleGoogleLoginSuccess}
//                 onError={handleGoogleLoginError}
//               />
//               <Dialog.Close asChild>
//                   <button className="dialog-button">Abbrechen</button>
//               </Dialog.Close>
//             </Dialog.Content>
//           </Dialog.Portal>
//         </Dialog.Root>
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default LoginPage;