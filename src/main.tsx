// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="304863205527-km2gobcs3pivovap0dnts40e73qt88h3.apps.googleusercontent.com">
      <BrowserRouter>
        <App />
        <Toaster position="top-center" />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
