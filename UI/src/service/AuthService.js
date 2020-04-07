import axios from 'axios';
import {
  APP_NAME,
  CURRENT_USER_URL,
  LOGIN_URL,
  REGISTER_URL,
  USERNAME_AVAILABLE_BASE_URL,
} from '../globals/routeConstants';
import {BehaviorSubject} from 'rxjs';

class AuthService {
  constructor() {
    this.currentUserSubject = new BehaviorSubject(null);

    if (this.isLoggedIn()) {
      this.setAuthHeader();
      this._getCurrentUser();
    }
  }


  register(credentials) {
    return axios.post(REGISTER_URL, {...credentials});
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
          this._getCurrentUser();
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
    this.currentUserSubject.next(null);
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  _getCurrentUser() {
    return axios.get(CURRENT_USER_URL)
        .then((response) => {
          this.currentUserSubject.next(response.data);
        });
  };
}

export default new AuthService();
