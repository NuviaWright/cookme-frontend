import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ingredients } from '../ingredient';
import { RecipeService } from '../recipe.service';
import { IngredientList } from '../ingredient-list';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css',
})
export class IngredientsComponent implements OnInit {
  ingredients: Array<string> = [];
  ingredientList: Array<IngredientList> = [];
  ingredient = new Ingredients('', '');
  error = false;
  errorMessage: string = '';

  @Output() recipes = new EventEmitter<any>();

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.getAllIngredients();
  }

  getAllIngredients() {
    this.recipeService.httpIngredient().subscribe((res) => {
      if (res.code == 'NG') {
        return;
      }

      this.ingredientList = res.response['meals'];
    });
  }

  addIngredient() {
    if (this.ingredient.name == '') return;

    let ingredientName = this.ingredient.name.replace(' ', '_');

    this.recipeService.httpRecipe(ingredientName).subscribe((res) => {
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
