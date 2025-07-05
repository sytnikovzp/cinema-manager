import axios from 'axios';

import { API_CONFIG } from '../constants';

export default axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
