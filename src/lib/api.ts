import { COMPANY_PATH } from '@/constants/data';
import { me } from '@/lib/users-api';
import axios from 'axios';
const AUTH_PATH_LOCAL = `${COMPANY_PATH}/api/v1/auth`;
const LOGOUT_PATH_LOCAL = `https://fra-app.site/api/v1/auth/logout`;

export async function login(param) {
  try {
    const res = await axios.post(`${AUTH_PATH_LOCAL}/authenticate`, param);
    if (res.data.data.role === 'ADMIN') {
      localStorage.setItem('accessToken', res.data.data.accessToken);
      await me();
    }
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function logout() {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const data = {};
    const res = await axios.post(`${LOGOUT_PATH_LOCAL}`, data, config);
    localStorage.removeItem('accessToken');
    return res.data;
  } catch (error) {
    localStorage.removeItem('accessToken');
    return error;
  }
}
