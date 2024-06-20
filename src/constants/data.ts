import { NavItem } from '@/types';

export const COMPANY_PATH = 'localhost';

export const navItems: NavItem[] = [
  {
    title: 'Account',
    href: '/account',
    icon: 'user',
    label: 'Account'
  },
  {
    title: 'Recipe',
    href: '/recipe',
    icon: 'recipe',
    label: 'Recipe'
  }
];

export const dashboardCard = [
  {
    date: 'Today',
    total: 2000,
    role: 'Students',
    color: 'bg-[#EC4D61] bg-opacity-40'
  },
  {
    date: 'Today',
    total: 2000,
    role: 'Teachers',
    color: 'bg-[#FFEB95] bg-opacity-100'
  },
  {
    date: 'Today',
    total: 2000,
    role: 'Parents',
    color: 'bg-[#84BD47] bg-opacity-30'
  },
  {
    date: 'Today',
    total: 2000,
    role: 'Schools',
    color: 'bg-[#D289FF] bg-opacity-30'
  }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null;
};

export type Account = {
  userId: number;
  name: string;
  email: string;
  gender: string;
  birthday: string;
  avatar: string;
  isActive: boolean;
};

export type Recipe = {
  recipeId: number;
  name: string;
  authorName: string;
  totalTime: string;
  images: string;
  calories: number;
  rating: number;
};

export type DetailRecipe = {
  recipe_id: number;
  name: string;
  author_id: number;
  author_name: string;
  cook_time: string;
  prep_time: string;
  total_time: string;
  date_published: string;
  description: string;
  image: string;
  recipe_category: string;
  keywords: string;
  recipe_ingredients_quantities: string; // Optional field
  recipe_ingredients_parts: string; // Optional field
  aggregated_ratings: number;
  review_count: number;
  calories: number;
  fat_content: number;
  saturated_fat_content: number;
  cholesterol_content: number;
  sodium_content: number;
  carbonhydrate_content: number;
  fiber_content: number;
  sugar_content: number;
  protein_content: number;
  recipe_servings: number;
  recipe_instructions: string;
};

export type Ingredients = {
  name: string;
  quantity: number;
  unit: string;
};

export type Instruction = {
  step: number;
  instruction: string;
};

export const mockIngredients = [
  {
    name: 'Sugar',
    quantity: 2,
    unit: 'cups'
  },
  {
    name: 'Flour',
    quantity: 3,
    unit: 'cups'
  },
  {
    name: 'Salt',
    quantity: 1,
    unit: 'tsp'
  },
  {
    name: 'Butter',
    quantity: 1,
    unit: 'cup'
  },
  {
    name: 'Milk',
    quantity: 1,
    unit: 'cup'
  }
];
