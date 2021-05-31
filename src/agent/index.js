import agent from './agent';

const responseBody = (res) => res.data;

const request = (agent) => ({
  get: (url, config) => agent.get(url, config).then(responseBody),
  post: (url, data, config) => agent.post(url, data, config).then(responseBody),
  put: (url, data, config) => agent.put(url, data, config).then(responseBody),
  patch: (url, data, config) => agent.patch(url, data, config).then(responseBody),
  delete: (url, config) => agent.delete(url, config).then(responseBody)
});

export default request(agent);
