import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/models/ingredient.model";
import { Subject } from "rxjs";

@Injectable()
export class RecipeServices {
  public addRecipes = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor() {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.addRecipes.next(this.recipes.slice());
  }
  
  getRecipes() {  
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(item: Recipe) {
    this.recipes.push(item);
    this.addRecipes.next(this.recipes.slice());
  }

  updateRecipe(index: number, item: Recipe) {
    this.recipes[index] = item;
    this.addRecipes.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.addRecipes.next(this.recipes.slice());
  }
}