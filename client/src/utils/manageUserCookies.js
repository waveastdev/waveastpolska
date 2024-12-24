export const getUserCookies = () => {
    const consent = document.cookie.split("; ").find(row => row.startsWith("cookieConsent="));
    return consent ? JSON.parse(consent.split("=")[1]) : null;
};
  
export const setUserCookies = (preferences) => {
    document.cookie = `cookieConsent=${JSON.stringify(preferences)}; path=/; max-age=31536000; SameSite=None; Secure`;
};