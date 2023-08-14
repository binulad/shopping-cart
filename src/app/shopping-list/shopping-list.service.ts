import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/models/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListServices {
  public shoppingItems = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient("Tomatoes", 5),
    new Ingredient("Cabbage", 1),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addItem(newItem: Ingredient) {
    this.ingredients.push(newItem);
    this.shoppingItems.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.shoppingItems.emit(this.ingredients.slice());
  }
}