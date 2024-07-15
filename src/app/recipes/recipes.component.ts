import { Component, Inject, Input, OnChanges, PLATFORM_ID, SimpleChanges } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Meals } from '../meals'
import { RouterLink } from '@angular/router'
import { RecipeService } from '../recipe.service'
import { retry } from 'rxjs'
import { env } from '../../../environment/environment.dev'
import { constant } from '../../../environment/recipeConstant'
import { Pages } from '../pages'

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent implements OnChanges {
  @Input() ingredient: string[] = []
  loading: boolean = false
  meals: Meals[] = []
  error: string = ''
  pages: Array<Pages> = []
  ingredientName: string = ''

  constructor(private recipeService: RecipeService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const ingredient = changes['ingredient'].currentValue

    if (changes['ingredient'].isFirstChange()) return
    if (ingredient.length == 0) {
      return
    }

    this.loading = true
    this.meals = []

    // TO DO: change to multiple search
    this.ingredientName = ingredient[ingredient.length - 1].replace(' ', '_')
    this.searchPaginatedRecipe(this.ingredientName, constant.PAGE, constant.SIZE)
  }

  searchPaginatedRecipe(ingredientName: string, page: number, size: number) {
    this.recipeService.httpPaginatedRecipe(ingredientName, page, size).subscribe({
      next: (res) => {
        this.loading = false
        this.pages = []

        if (res?.code == 'NG') {
          this.error = res.message
          return
        }
        if (res.response == null) {
          this.loading = false
          this.meals = []
          this.error = ''
          return
        }

        this.meals = res.response['content']
        let totalPages = res.response['totalPages']

        for (let i = 0; i < totalPages; i++) {
          let p = {
            number: i,
            active: i == res.response['number'],
          }

          this.pages.push(p)
        }
      },
      error: (err) => {
        retry(1)

        if (err) {
          this.error = env.errorMessages.server
          this.loading = false
        }
      },
      complete: () => {
        this.error = ''
      },
    })
  }

  searchRecipe(ingredientName: string) {
    this.recipeService.httpRecipe(ingredientName).subscribe({
      next: (res) => {
        if (res?.code == 'NG') {
          this.error = res.message
          return
        }

        this.loading = false
        this.meals = res.response['meals'] != null ? res.response['meals'] : []
      },
      error: (err) => {
        retry(1)

        if (err) {
          this.error = env.errorMessages.server
          this.loading = false
        }
      },
      complete: () => {
        this.error = ''
      },
    })
  }

  changePage(pageNumber: number) {
    this.searchPaginatedRecipe(this.ingredientName, pageNumber, constant.SIZE)
  }
}
