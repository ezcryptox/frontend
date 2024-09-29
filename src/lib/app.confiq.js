import { browser } from '$app/environment';
let url = "";
export const ServerURl = () => {
  if (browser) {
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
      url = "http://localhost:8000";
    } else {
      url = "https://ezcryptox.onrender.com";
    }
    return url
  }
};

export class appScript{
    constructor(){
        this.logo = ""
        this.theme = ""
        this.language = ""
        this.islogin = false
        this.screen = 1200
        this.serverUrl = ServerURl()
    }
    themeConfig(theme){
        this.theme = theme
        document.body.className = `${this.theme}`
    }
    setAuth(auth){
        this.is_login = auth
    }
}


