import { useEffect } from "react";

export default function GoogleCallbackPage() {
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");

    if (window.opener && accessToken) {
      window.opener.postMessage(
        { type: "google-auth-success", token: accessToken },
        window.location.origin,
      );
    }
    window.close();
  }, []);

  return <p>Authenticating...</p>;
}
