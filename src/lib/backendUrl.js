import { browser } from '$app/environment';
export const ServerURl = () => {
  let url = "https://ezcryptox.onrender.com";
  if (browser) {
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
      url = "https://ezcryptox.onrender.com";
    } else {
      url = "https://ezcryptox.onrender.com";
    }
  }
  return url
};

export const pageURL = () => {
  return "http://localhost:5173";
  // return "https://dotplayplay.netlify.app";
};
