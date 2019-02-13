
class Auth {
  static authenticateUser (jwtPrivateKey) {
    localStorage.setItem("jwtPrivateKey", jwtPrivateKey);
  }

  static isUserAuthenticated () {
    return localStorage.getItem("jwtPrivateKey") !== null;
  }

  static deauthenticateUser () {
    return localStorage.removeItem("jwtPrivateKey");
  }

  static getUser () {
    localStorage.getItem("jwtPrivateKey");
  }
}

export default Auth;