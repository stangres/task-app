import agent from '../agent';
import auth from './auth';
import task from './task';

const api = {
  auth: auth(agent),
  task: task(agent),
};

export default api;