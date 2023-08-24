import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Recipe } from 'src/app/recipes/recipe.model';
import { RecipeServices } from 'src/app/recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {
  isSaveSuccessfully = new Subject<boolean>();

  constructor(private http: HttpClient, private recipes: RecipeServices, private authService: AuthService) { }

  saveRecipeData() {
    const recipes = this.recipes.getRecipes();
    return this.http.put('https://ng-recipe-book-c2825-default-rtdb.firebaseio.com/recipes.json', recipes);
  }

  fetchRecipeData() {
    // return this.authService.user.pipe(
    //   take(1),
    //   exhaustMap(user => { 
    //     const token = user?.token ? user?.token : '';
    //     return this.http.get<Recipe[]>('https://ng-recipe-book-c2825-default-rtdb.firebaseio.com/recipes.json', {
    //       params: new HttpParams().set("auth", token)
    //     })
    //   }),
    //   map((recipes) => {
    //     return recipes.map((recipe) => {
    //       return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
    //     });
    //   }),
    //   tap((recipes) => {
    //     this.recipes.setRecipes(recipes);
    //   })
    // )

    return this.http.get<Recipe[]>('https://ng-recipe-book-c2825-default-rtdb.firebaseio.com/recipes.json').pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
        });
      }),
      tap((recipes) => {
        this.recipes.setRecipes(recipes);
      })
    )
  }
}
