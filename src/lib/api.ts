import { COMPANY_PATH } from '@/constants/data';
import axios from 'axios';
// ---------------------------- Student API ------------------------------------------------- //
// export async function resendEmail(email: string) {
//     try {
//       const res = await axios.post("/auth/register/resend-email/", { email });
//       return res.data;
//     } catch (error) {
//       console.log(error);
//       return error;
//     }
// }

const AUTH_PATH_LOCAL = `${COMPANY_PATH}:8082/api/v1/auth`;
const LOGOUT_PATH_LOCAL = `${COMPANY_PATH}:8082/api/logout`;

export async function getStudents(
  offset: number,
  pageLimit: number,
  country: string
) {
  try {
    const res = await axios.get(
      `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${pageLimit}` +
        (country ? `&search=${country}` : '')
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function login(param) {
  try {
    const res = await axios.post(`${AUTH_PATH_LOCAL}/authenticate`, param);
    if (res.data.data.role === 'ADMIN') {
      localStorage.setItem('accessToken', res.data.data.accessToken);
    }
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function logout() {
  try {
    const token = localStorage.getItem('accessToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const res = await axios.post(`${LOGOUT_PATH_LOCAL}`, config);
    localStorage.removeItem('accessToken');
    return res.data;
  } catch (error) {
    localStorage.removeItem('accessToken');

    return error;
  }
}
