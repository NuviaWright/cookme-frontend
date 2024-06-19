import {
  Component,
  Output,
  EventEmitter,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Ingredients } from '../ingredient';
import { RecipeService } from '../recipe.service';
import { IngredientList } from '../ingredient-list';
import { retry } from 'rxjs';
import { env } from '../../../environment/environment.dev';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css',
})

/*
TO DO:
 1. Multiple search of ingredients 
*/
export class IngredientsComponent {
  ingredients: Array<string> = [];
  ingredientList: Array<IngredientList> = [];
  ingredient = new Ingredients('', '');
  error: string | undefined;

  @Output() recipes = new EventEmitter<string[]>();

  constructor(
    private recipeService: RecipeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.getAllIngredients();

    if (isPlatformBrowser(this.platformId)) {
      const storedIngredients = localStorage
        .getItem('cookMe_ingredients')
        ?.split(',');

      if (storedIngredients && storedIngredients.length > 0) {
        this.ingredients = storedIngredients;
        this.search();
      }
    }
  }

  getAllIngredients() {
    this.recipeService.httpIngredient().subscribe({
      next: (res) => {
        this.error = '';
        if (res.code == 'NG') {
          this.error = res.message;
          return;
        }

        this.ingredientList = res.response['meals'];
      },
      error: (err) => {
        retry(1);

        if (err) {
          this.error = env.errorMessages.server;
        }
      },
      complete: () => {
        this.error = '';
      },
    });
  }

  addIngredient() {
    if (this.ingredient.name == '') return;

    this.ingredients.push(this.ingredient.name);
    this.ingredient.name = '';

    localStorage.setItem('cookMe_ingredients', this.ingredients.toString());
  }

  removeIngredient(ingredient: string) {
    this.ingredients.filter((value, index) => {
      if (value === ingredient) {
        const indexRemove = index;
        this.ingredients.splice(indexRemove, 1);

        if (this.ingredients.length == 0) {
          localStorage.clear();
        } else {
          localStorage.setItem(
            'cookMe_ingredients',
            this.ingredients.toString()
          );
        }
        return true;
      }

      return false;
    });
  }

  search() {
    this.ingredients = this.ingredients.slice();
    this.recipes.emit(this.ingredients);
  }

  clearAll() {
    this.ingredients = [];
    localStorage.removeItem('cookMe_ingredients');
  }
}
