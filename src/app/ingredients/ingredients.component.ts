import { Component, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ingredients } from '../ingredient';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css',
})
export class IngredientsComponent {
  ingredients: Array<string> = [];
  ingredient = new Ingredients("");

  addIngredient() {
    if(this.ingredient.name == "") return;
    this.ingredients.push(this.ingredient.name);
    this.ingredient.name = "";
  }
}
