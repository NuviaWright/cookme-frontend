import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Food } from '../food';
import { Ingredients } from '../ingredient';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food.component.html',
  styleUrl: './food.component.css',
})
export class FoodComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  mealId = -1;
  food: Food | null = null;
  error: string | null = null;
  ingredients: Array<Ingredients> = [];

  constructor(private recipeService: RecipeService) {
    this.mealId = Number(this.route.snapshot.params['id']);

    this.recipeService.fetchMeal(this.mealId).then((res) => {
      if (res?.code == 'NG') {
        this.error = res.message;
        return;
      }

      this.food = res?.response.meals[0];
      this.food?.strInstructions.trimStart();
      let name, measure;
      for (let i = 1; i <= 20; i++) {
        name = res?.response.meals[0]['strIngredient' + i];
        if (name == null || name == '') break;

        measure = res?.response.meals[0]['strMeasure' + i];
        this.ingredients.push(new Ingredients(name, measure));
      }
    });
  }
}
