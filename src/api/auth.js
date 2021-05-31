export default function auth(client) {
  return {
    login: (username, password) => {
      return client.post('/login', {username, password});
    }
  }
}