import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RecipeSearchRes } from './recipe-search-res';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private urlRecipe = 'http://127.0.0.1:8081/recipe';
  private urlIngredient = 'http://127.0.0.1:8081/ingredient';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  async fetchRecipe(ingredient: string): Promise<RecipeSearchRes> {
    const res = await fetch(`${this.urlRecipe}/find/${ingredient}`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
    return (await res.json()) ?? '';
  }

  httpRecipe(ingredient: string): Observable<RecipeSearchRes> {
    return this.http.get<RecipeSearchRes>(
      `${this.urlRecipe}/find/${ingredient}`
    );
  }

  async fetchMeal(mealId: number): Promise<RecipeSearchRes> {
    const res = await fetch(`${this.urlRecipe}/meal/${mealId}`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        accept: 'application/json',
      },
    });
    return (await res.json()) ?? '';
  }

  httpMeal(mealId: number): Observable<RecipeSearchRes> {
    return this.http.get<RecipeSearchRes>(`${this.urlRecipe}/meal/${mealId}`);
  }

  async fetchIngredient(): Promise<RecipeSearchRes> {
    const res = await fetch(`${this.urlIngredient}/list`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
    return (await res.json()) ?? '';
  }

  httpIngredient(): Observable<RecipeSearchRes> {
    return this.http.get<RecipeSearchRes>(`${this.urlIngredient}/list`);
  }
}
