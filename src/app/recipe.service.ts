import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RecipeSearchRes } from './recipe-search-res';
import { catchError, map, tap } from 'rxjs/operators';

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

  recipeFind(ingredient: string): Observable<RecipeSearchRes> {
    const urlRecipe = `${this.urlRecipe}/${ingredient}`;
    return this.http.get<RecipeSearchRes>(urlRecipe).pipe(
      tap((_) => this.log('fetched data')),
      catchError(this.handleError<RecipeSearchRes>('recipeFind'))
    );
  }

  async fetchRecipe(ingredient: string): Promise<RecipeSearchRes> {
    const res = await fetch(`${this.urlRecipe}/find/${ingredient}`);
    return (await res.json()) ?? '';
  }

  async fetchMeal(mealId: number): Promise<RecipeSearchRes> {
    const res = await fetch(`${this.urlRecipe}/meal/${mealId}`);
    return (await res.json()) ?? '';
  }

  async fetchIngredient(): Promise<RecipeSearchRes> {
    const res = await fetch(`${this.urlIngredient}/list`);
    return (await res.json()) ?? '';
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
