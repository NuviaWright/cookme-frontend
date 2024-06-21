import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ingredients } from '../ingredient';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css',
})
export class IngredientsComponent {
  ingredients: Array<string> = [];
  ingredient = new Ingredients('', '');
  error = false;
  errorMessage: string = '';

  @Output() recipes = new EventEmitter<any>();

  constructor(private recipeService: RecipeService) {}

  addIngredient() {
    if (this.ingredient.name == '') return;

    this.ingredient.name = this.ingredient.name.replace(' ', '_');

    this.recipeService.fetchRecipe(this.ingredient.name).then((res) => {
      if (res?.code == 'NG') {
        this.error = true;
        this.errorMessage = res.message;
        return;
      }

      this.ingredients.push(this.ingredient.name);
      this.ingredient.name = '';
      this.recipes.emit(res);
    });
  }
}
