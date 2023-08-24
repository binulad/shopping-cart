import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { Observable } from 'rxjs';
import { CommonHttpService } from '../shared/services/common-http.service';
import { RecipeServices } from './recipe.service';

export const RecipeResolverService: ResolveFn<Recipe[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  commonHttpService: CommonHttpService = inject(CommonHttpService),
  recipeServices: RecipeServices = inject(RecipeServices)
): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> => {

  const recipes = recipeServices.getRecipes();
  if (recipes.length === 0) {
    return commonHttpService.fetchRecipeData();
  } else {
    return recipes;
  }
  
}
