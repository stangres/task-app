import authStore from '../stores/AuthStore';
import loginStore from '../stores/LoginStore';

export default async function guard() {
  if (authStore.isAuthenticated) {
    return true;
  }

  return await loginStore.isLoggedIn();
}