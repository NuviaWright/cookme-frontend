import { RecipeRes } from './recipe-res';

export interface RecipeSearchRes {
  response: RecipeRes[];
  message: string;
  code: string;
}
