import axios from 'axios';
import configure  from './interceptors';

const agent = axios.create({
  baseURL: 'https://uxcandy.com/~shapoval/test-task-backend/v2/',
  timeout: 10000,
  validateStatus: () => true
});

configure(agent);

export default agent;