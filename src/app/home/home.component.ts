import { Component } from '@angular/core'
import { IngredientsComponent } from '../ingredients/ingredients.component'
import { RecipesComponent } from '../recipes/recipes.component'
import { FilterComponent } from '../filter/filter.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IngredientsComponent, RecipesComponent, FilterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  recipes: string[] = []

  onRecipes(res: any) {
    this.recipes = res
  }
}
