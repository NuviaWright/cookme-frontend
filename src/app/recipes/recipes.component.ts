import {
  Component,
  Inject,
  Input,
  OnChanges,
  PLATFORM_ID,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meals } from '../meals';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { retry } from 'rxjs';
import { env } from '../../../environment/environment.dev';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent implements OnChanges {
  @Input() ingredient: string[] = [];
  loading: boolean = false;
  meals: Meals[] = [];
  error: string = '';

  constructor(private recipeService: RecipeService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const ingredient = changes['ingredient'].currentValue;

    if (changes['ingredient'].isFirstChange()) return;
    if (ingredient.length == 0) {
      return;
    }

    this.loading = true;
    this.meals = [];

    // TO DO: change to multiple search
    let ingredientName = ingredient[ingredient.length - 1].replace(' ', '_');
    this.recipeService.httpRecipe(ingredientName).subscribe({
      next: (res) => {
        console.log(res);
        if (res?.code == 'NG') {
          this.error = res.message;
          return;
        }

        this.loading = false;
        this.meals = res.response['meals'] != null ? res.response['meals'] : [];
      },
      error: (err) => {
        retry(1);

        if (err) {
          this.error = env.errorMessages.server;
          this.loading = false;
        }
      },
      complete: () => {
        this.error = '';
      },
    });
  }
}
