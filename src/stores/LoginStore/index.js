import {action, makeObservable, observable, when} from 'mobx';
import authStore from '../AuthStore';

class LoginStore {
  constructor() {
    this.isShow = false;

    makeObservable(this, {
      isShow: observable,
      show: action,
      close: action
    });
  }

  show() {
    this.isShow = true;
  }

  close() {
    this.isShow = false;
  }

  isLoggedIn() {
    this.show();

    return new Promise((resolve) => {
      when(
        () => !this.isShow,
        () => {
          resolve(authStore.isAuthenticated);
        }
      );
    });
  }
}

export default new LoginStore();