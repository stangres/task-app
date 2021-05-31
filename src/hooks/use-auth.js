import useStores from './use-stores'

export default function useAuth() {
  const { authStore } = useStores();
  return authStore;
}