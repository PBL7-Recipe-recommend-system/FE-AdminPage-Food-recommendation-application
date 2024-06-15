import { useQuery } from '@tanstack/react-query';
import {
  getDetailIngredients,
  getDetailInstruction,
  getDetailRecipes,
  getRecipes
} from '@/lib/recipes-api';
export const useGetRecipes = (page, size) => {
  return useQuery({
    queryKey: ['recipes', page, size],
    queryFn: async () => getRecipes(page, size)
  });
};

export const useGetDetailRecipes = (recipeId: number) => {
  return useQuery({
    queryKey: ['detailRecipes', recipeId],
    queryFn: async () => getDetailRecipes(recipeId)
  });
};

export const useGetDetailIngredients = (recipeId: number) => {
  return useQuery({
    queryKey: ['ingredients', recipeId],
    queryFn: async () => getDetailIngredients(recipeId)
  });
};

export const useGetDetailInstructions = (recipeId: number) => {
  return useQuery({
    queryKey: ['instructions', recipeId],
    queryFn: async () => getDetailInstruction(recipeId)
  });
};
