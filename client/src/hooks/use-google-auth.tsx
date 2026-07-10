import { useEffect, useState } from "react";

export function useGoogleAuth() {
  const [authData, setAuthData] = useState<{
    loginSuccess: boolean;
    accessToken: string;
  }>({
    loginSuccess: false,
    accessToken: "",
  });
  let popup: Window | null = null;

  function handleGoogleSignIn() {
    // In a real application, you would redirect to your Google OAuth URL
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const options = {
      redirect_uri: "http://localhost:5173/auth/google/callback",
      client_id: import.meta.env.VITE_APP_GOOGLE_OAUTH_CLIENT_ID,
      response_type: "token",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };

    const qs = new URLSearchParams(options);
    const googleOauthUrl = `${rootUrl}?${qs.toString()}`;

    const width = 600;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    popup = window.open(
      googleOauthUrl,
      "google-signin",
      `width=${width},height=${height},top=${top},left=${left}`,
    );
  }

  useEffect(() => {
    const messageListener = (event: MessageEvent) => {
      console.log(event?.data?.type);
      if (
        event.origin === window.location.origin &&
        event.data.type === "google-auth-success"
      ) {
        setAuthData({ loginSuccess: true, accessToken: event.data.token });
        popup?.close();
      }
    };

    window.addEventListener("message", messageListener, false);

    return () => {
      window.removeEventListener("message", messageListener);
    };
  }, []);

  return { handleGoogleSignIn, authData };
}
