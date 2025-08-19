import Rreact, { useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthProvider";

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleButton() {
  const divRef = useRef<HTMLDivElement>(null);
  const { googleLogin } = useAuth();

  useEffect(() => {
    if (!window.google || !divRef.current) return;
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: async (response: any) => {
        await googleLogin(response.credential);
      },
    });
    window.google.accounts.id.renderButton(divRef.current, {
      theme: "outline",
      size: "large",
      text: "signin_with",
    });
  }, [googleLogin]);

  return <div ref={divRef} />;
}
