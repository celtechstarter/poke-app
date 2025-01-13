// import React from "react";
// import * as Dialog from "@radix-ui/react-dialog";
// import "./LoginPage.css";

// const LoginPage = () => {
//   const handleGoogleLogin = () => {
//     // Backend-URL aus Umgebungsvariablen
//     const loginURL = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
//     window.location.href = loginURL; // Weiterleitung zu Google OAuth
//   };

//   return (
//     <div className="login-container">
//       <Dialog.Root>
//         <Dialog.Trigger asChild>
//           <button className="login-button">Login mit Google</button>
//         </Dialog.Trigger>
//         <Dialog.Portal>
//           <Dialog.Overlay className="dialog-overlay" />
//           <Dialog.Content className="dialog-content">
//             <Dialog.Title className="dialog-title">Login mit Google</Dialog.Title>
//             <button
//               onClick={handleGoogleLogin}
//               className="dialog-button google-login-button"
//             >
//               Login mit Google
//             </button>
//             <Dialog.Close asChild>
//               <button className="dialog-button">Abbrechen</button>
//             </Dialog.Close>
//           </Dialog.Content>
//         </Dialog.Portal>
//       </Dialog.Root>
//     </div>
//   );
// };

// export default LoginPage;
