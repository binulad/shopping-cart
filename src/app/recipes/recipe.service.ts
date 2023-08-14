import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/models/ingredient.model";

@Injectable()
export class RecipeServices {
  private recipes: Recipe[] = [
    new Recipe(
      'Burger Regular',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 
      "https://natashaskitchen.com/wp-content/uploads/2023/06/Cheeseburger.jpg",
      [
        new Ingredient("Onion", 1),
        new Ingredient("Cheese", 2)
      ]),
    new Recipe(
      'Burger Large',
      'Ab incidunt provident reprehenderit fugiat nam minus qui minima rerum quas corporis.', 
      "https://natashaskitchen.com/wp-content/uploads/2023/06/Cheeseburger.jpg",
      [
        new Ingredient("Onion", 2),
        new Ingredient("Cheese", 5)
      ])
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }
}