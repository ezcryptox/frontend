import { browser } from '$app/environment'
export const ServerURl = () => {
  if (browser) {
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
      return "http://localhost:8000";
    } else {
      return "https://ezcryptox.onrender.com";
    }
  }
  return "https://ezcryptox.onrender.com";
};

export const pageURL = () => {
  return "http://localhost:5173";
  // return "https://dotplayplay.netlify.app";
};
