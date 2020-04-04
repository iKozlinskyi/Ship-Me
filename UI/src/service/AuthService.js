import axios from 'axios';
import {
  APP_NAME,
  LOGIN_URL,
  REGISTER_URL,
  USERNAME_AVAILABLE_BASE_URL,
} from '../globals/routeConstants';
import jwt from 'jsonwebtoken';

class AuthService {
  constructor() {
    if (this.isLoggedIn()) {
      this.setAuthHeader();
    }
  }


  register(credentials, successCallback) {
    axios.post(REGISTER_URL, {...credentials})
        .then((res) => {
          this.saveToken(res.data.token);
          this.setAuthHeader();
          successCallback(res);
        });
  }

  async isUsernameAvailable(username) {
    let result;
    let usernameAvailable;

    try {
      result = await axios.get(USERNAME_AVAILABLE_BASE_URL,
          {params: {username: username}});
      usernameAvailable = result.status === 200;
    } catch (err) {
      usernameAvailable = false;
    }
    return usernameAvailable;
  }

  login(credentials) {
    return axios.post(LOGIN_URL, {...credentials})
        .then((res) => {
          this.saveToken(res.data.token);
          this.setAuthHeader();
        });
  }

  saveToken(token) {
    localStorage.setItem(`${APP_NAME}-token`, token);
  }

  getToken() {
    return localStorage.getItem(`${APP_NAME}-token`);
  }

  getAuthHeader() {
    const token = this.getToken();
    if (!token) return null;

    return `Bearer ${token}`;
  }


  setAuthHeader() {
    axios.defaults.headers.common['Authorization'] = this.getAuthHeader();
  }

  deleteAuthHeader() {
    delete axios.defaults.headers.common['Authorization'];
  }

  logOut() {
    localStorage.removeItem(`${APP_NAME}-token`);
    delete axios.defaults.headers.common['Authorization'];
  }

  refreshAuthHeader() {
    const authHeader = this.getAuthHeader();

    if (authHeader) {
      this.setAuthHeader();
    } else {
      this.deleteAuthHeader();
    }
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getLoggedUser() {
    return jwt.decode(this.getToken()).username;
  }
}

export default new AuthService();
