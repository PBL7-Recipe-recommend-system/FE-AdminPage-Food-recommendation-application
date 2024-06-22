import { COMPANY_PATH } from '@/constants/data';
import axios from 'axios';
const INSTRUCTION_PATH_LOCAL = `${COMPANY_PATH}:8082/api/v1/instruction`;

export async function addNewInstruction(recipeId: number, data) {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const res = await axios.post(
      `${INSTRUCTION_PATH_LOCAL}/${recipeId}`,
      data,
      config
    );
    console.log(`${INSTRUCTION_PATH_LOCAL}/${recipeId}`);
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function updateInstruction(recipeId: number, data) {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const res = await axios.put(
      `${INSTRUCTION_PATH_LOCAL}/${recipeId}`,
      data,
      config
    );
    console.log(`${INSTRUCTION_PATH_LOCAL}/${recipeId}`);
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function deleteInstruction(recipeId: number, step) {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const res = await axios.delete(
      `${INSTRUCTION_PATH_LOCAL}/${recipeId}/step/${step}`,
      config
    );
    console.log(`${INSTRUCTION_PATH_LOCAL}/${recipeId}/step/${step}`);
    return res.data;
  } catch (error) {
    return error;
  }
}
