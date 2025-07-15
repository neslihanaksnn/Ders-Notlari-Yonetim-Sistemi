import axios from 'axios';

const API_BASE_URL = 'http://localhost:5004/api';

export function loginUser(credentials) {
  return axios.post(`${API_BASE_URL}/auth/giris`, credentials);
}

