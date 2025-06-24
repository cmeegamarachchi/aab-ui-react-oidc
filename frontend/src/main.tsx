import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from "react-oidc-context";

import './index.css'
import App from './App.tsx'


const authConfig = {
  authEnabled: import.meta.env.VITE_AUTH_ENABLED !== "false",
  authority: `${import.meta.env.VITE_UI_OIDC_AUTHORITY}`,
  client_id: `${import.meta.env.VITE_UI_OIDC_CLIENT_ID}`,
  redirect_uri: `${import.meta.env.VITE_UI_OIDC_REDIRECT_URI}`,
  response_type: "code",
  scope: `${import.meta.env.VITE_UI_OIDC_SCOPE}`,
  onSigninCallback: () => {
    window.location.replace('/');
    return Promise.resolve();
  },
};

const authEnabled = authConfig.authEnabled;

console.dir("Auth config:", authConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {authEnabled ? (
      <AuthProvider {...authConfig}>
        <App />
      </AuthProvider>
    ) : (
      <App />
    )}
  </StrictMode>,
)
