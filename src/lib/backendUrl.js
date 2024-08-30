import { browser } from '$app/environment'
export const ServerURl = () => {
  return "http://localhost:8000"
  // if (browser) {
  //   if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
  //     return "http://localhost:8000";
  //   } else {
  //     return "https://backend-8wyk.onrender.com";
  //   }
  // }
  // return "https://backend-8wyk.onrender.com";
};

export const pageURL = () => {
  return "http://localhost:5173";
  // return "https://dotplayplay.netlify.app";
};
