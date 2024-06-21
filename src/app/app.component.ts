import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeSearchRes } from './recipe-search-res';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IngredientsComponent, RecipesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'CookMe';
  recipes: RecipeSearchRes = {
    response: [],
    code: '',
    message: '',
  };

  onRecipes(res: any) {
    this.recipes = res;
  }
}
