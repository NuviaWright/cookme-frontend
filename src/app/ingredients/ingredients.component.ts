import { Component, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ingredients } from '../ingredient';
import { RecipeService } from '../recipe.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css',
})
export class IngredientsComponent {
  ingredients: Array<string> = [];
  ingredient = new Ingredients('');

  constructor(private recipeService: RecipeService) {}

  addIngredient() {
    if (this.ingredient.name == '') return;

    this.ingredients.push(this.ingredient.name);
    // const recipes = this.recipeService.recipeFind(this.ingredient.name);
    console.log(this.recipeService.fetchRecipe(this.ingredient.name));

    this.ingredient.name = '';
  }
}
