export function useSigninStrategy() {
  const visitGithubConsentScreen = () => {
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
      scope: "read:user user:email",
    });

    window.location.href = `https://github.com/login/oauth/authorize?${params.toString()}`;
  };

  return { visitGithubConsentScreen };
}
