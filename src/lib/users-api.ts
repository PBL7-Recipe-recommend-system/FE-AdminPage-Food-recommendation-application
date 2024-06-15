import { COMPANY_PATH } from '@/constants/data';
import axios from 'axios';

const USER_PATH_LOCAL = `http://${COMPANY_PATH}:8082/api/v1/admin/users`;

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
