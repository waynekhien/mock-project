import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const rootEl = document.getElementById("root")!;
const root = createRoot(rootEl);

// LẤY CLIENT ID TỪ ENV Ở ĐÂY
const cid = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
console.log("GOOGLE CID =", cid);

root.render(
  <StrictMode>
    <GoogleOAuthProvider clientId={cid}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
