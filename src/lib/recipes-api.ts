import { COMPANY_PATH } from '@/constants/data';
import axios from 'axios';

const RECIPE_PATH_LOCAL = `${COMPANY_PATH}/api/v1/recipes`;
const INGREDIENT_PATH_LOCAL = `${COMPANY_PATH}/api/v1/ingredients/recipe`;
const INSTRUCTION_PATH_LOCAL = `${COMPANY_PATH}/api/v1/instruction`;

export async function getRecipes(page: number, size: number) {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const res = await axios.get(
      `${RECIPE_PATH_LOCAL}/search?page=${page}&size=${size}`,
      config
    );
    console.log(`${RECIPE_PATH_LOCAL}/search?page=${page}&size=${size}`);
    return res.data.data;
  } catch (error) {
    return error;
  }
}

export async function getDetailRecipes(recipeId: number) {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const res = await axios.get(`${RECIPE_PATH_LOCAL}?id=${recipeId}`, config);
    console.log(`${RECIPE_PATH_LOCAL}?id=${recipeId}`);
    return res.data.data;
  } catch (error) {
    return error;
  }
}

export async function addNewRecipe(data) {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const res = await axios.post(`${RECIPE_PATH_LOCAL}`, data, config);
    console.log(`${RECIPE_PATH_LOCAL}`);
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function getDetailIngredients(recipeId: number) {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const res = await axios.get(`${INGREDIENT_PATH_LOCAL}/${recipeId}`, config);
    console.log(`${INGREDIENT_PATH_LOCAL}/${recipeId}`);
    return res.data.data;
  } catch (error) {
    return error;
  }
}

export async function updateIngredientsList(recipeId: number, data) {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const res = await axios.put(
      `${INGREDIENT_PATH_LOCAL}/${recipeId}`,
      data,
      config
    );
    console.log(`${INGREDIENT_PATH_LOCAL}/${recipeId}`);
    return res.data.data;
  } catch (error) {
    return error;
  }
}

export async function addNewIngredients(recipeId: number, data) {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const res = await axios.post(
      `${INGREDIENT_PATH_LOCAL}/${recipeId}`,
      data,
      config
    );
    console.log(`${INGREDIENT_PATH_LOCAL}/${recipeId}`);
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function getDetailInstruction(recipeId: number) {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const res = await axios.get(
      `${INSTRUCTION_PATH_LOCAL}/${recipeId}`,
      config
    );
    console.log(`${INSTRUCTION_PATH_LOCAL}/${recipeId}`);
    const transformedData = res.data.data.map((description, index) => {
      return {
        step: index + 1,
        instruction: description
      };
    });
    return transformedData;
  } catch (error) {
    return error;
  }
}

export async function updateDetailedRecipe(recipeId: number, data) {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const res = await axios.put(
      `${RECIPE_PATH_LOCAL}/${recipeId}`,
      data,
      config
    );
    console.log(`${RECIPE_PATH_LOCAL}/${recipeId}`);
    return res.data.data;
  } catch (error) {
    return error;
  }
}
