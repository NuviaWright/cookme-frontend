import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RecipeSearchRes } from '../recipe-search-res';
import { CommonModule } from '@angular/common';
import { RecipeRes } from '../recipe-res';
import { Meals } from '../meals';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule],
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
    console.log(res.response['meals']);
    if (res.code == 'NG') {
      this.error = res.message;
      return;
    }

    this.meals = res.response['meals'];
  }
}
