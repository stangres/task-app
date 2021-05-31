import { observable, action, computed, makeObservable, runInAction } from 'mobx';
import client from '../../api';

const storage = window.localStorage;

class AuthStore {
  isLoading = false;
  error = '';

  _usernameKey = 'username';
  _tokenKey = 'token';

  username = storage.getItem(this._usernameKey);
  token = storage.getItem(this._tokenKey);

  constructor() {
    makeObservable(this, {
      username: observable,
      token: observable,
      isLoading: observable,
      error: observable,
      isAuthenticated: computed,
      login: action,
      logout: action,
    });
  }

  get isAuthenticated() {
    return !!(this.token);
  }

  async login(username, password) {
    this.username = '';
    this.token = '';
    this.isLoading = true;
    this.error = '';

    let result = false;

    try {
      const res = await client.auth.login(username, password);

      result = true;

      runInAction(() => {
        this.username = username;
        storage.setItem(this._usernameKey, this.username);

        this.token = res.message.token;
        storage.setItem(this._tokenKey, this.token);
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }

    return result;
  }

  logout() {
    this.username = '';
    storage.removeItem(this._usernameKey);

    this.token = '';
    storage.removeItem(this._tokenKey);
  }
}

export default new AuthStore();