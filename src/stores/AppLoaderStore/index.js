import {observable, action, makeObservable} from 'mobx';

class AppLoaderStore {
  isLoading = false;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      toLoaded: action,
      toLoading: action
    });
  }

  toLoaded() {
    this.isLoading = false;
  }

  toLoading() {
    this.isLoading = true;
  }
}

export default new AppLoaderStore();