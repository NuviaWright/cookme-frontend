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
 2. Update list of meals when an ingredients remove
 3. Remove search of meals when clicking Add button
*/
export class IngredientsComponent {
  ingredients: Array<string> = [];
  ingredientList: Array<IngredientList> = [];
  ingredient = new Ingredients('', '');
  error = false;
  errorMessage: string = '';
  private readonly storage!: Storage;

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
        if (res.code == 'NG') {
          return;
        }

        this.ingredientList = res.response['meals'];
      },
      error: () => {
        retry(1);
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
