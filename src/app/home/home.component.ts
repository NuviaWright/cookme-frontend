import { Component } from '@angular/core';
import { IngredientsComponent } from '../ingredients/ingredients.component';
import { RecipesComponent } from '../recipes/recipes.component';
import { RecipeSearchRes } from '../recipe-search-res';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IngredientsComponent, RecipesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // recipes: RecipeSearchRes = {
  //   response: [],
  //   code: '',
  //   message: '',
  // };

  recipes: string[] = [];

  onRecipes(res: any) {
    this.recipes = res;
  }
}
