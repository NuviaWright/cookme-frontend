import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RecipeSearchRes } from '../recipe-search-res';
import { CommonModule } from '@angular/common';
import { Meals } from '../meals';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent implements OnChanges {
  @Input() recipesRes: RecipeSearchRes = {
    response: [],
    code: '',
    message: '',
  };

  meals: Meals[] = [];
  error: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['recipesRes'].isFirstChange()) return;

    const res = changes['recipesRes'].currentValue;
    if (res.code == 'NG') {
      this.error = res.message;
      return;
    }

    this.meals = res.response['meals'];
  }
}
