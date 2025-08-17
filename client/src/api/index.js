import axios from 'axios';

import { API_CONFIG } from '@/src/constants';

export default axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
