import { COMPANY_PATH } from '@/constants/data';
import axios from 'axios';

const USER_PATH_LOCAL = `${COMPANY_PATH}:8082/api/v1/admin/users`;
export async function getUsers(page: number, size: number) {
  const token = localStorage.getItem('accessToken');

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const res = await axios.get(
      `${USER_PATH_LOCAL}?page=${page}&size=${size}`,
      config
    );
    console.log(`${USER_PATH_LOCAL}?page=${page}&size=${size}`);
    return res.data.data;
  } catch (error) {
    return error;
  }
}

export async function me() {
  const token = localStorage.getItem('accessToken');

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const res = await axios.get(`${COMPANY_PATH}:8082/api/v1/users/me`, config);
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function getDetailedUser(id) {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const res = await axios.get(`${USER_PATH_LOCAL}/${id}`, config);
    return res.data.data;
  } catch (error) {
    return error;
  }
}

export async function lockProfile(id, type) {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const data = {};
  try {
    const res = await axios.put(
      `${USER_PATH_LOCAL}/${id}/${type}`,
      data,
      config
    );
    return res.data.data;
  } catch (error) {
    return error;
  }
}

export async function addAccount(data) {
  const token = localStorage.getItem('accessToken');

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const res = await axios.post(`${USER_PATH_LOCAL}`, data, config);
    return res.data;
  } catch (error) {
    return error;
  }
}
export async function updateProfile(data) {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const res = await axios.put(
      `https://localhost:8082/api/v1/users/me`,
      data,
      config
    );
    return res.data.data;
  } catch (error) {
    return error;
  }
}
