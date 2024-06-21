import { RecipeRes } from './recipe-res';

export interface RecipeSearchRes {
  object: RecipeRes[];
  message: string;
  code: string;
}
