import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/models/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListServices {
  public shoppingItems = new EventEmitter<Ingredient[]>();
  public editedItemIndex = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient("Tomatoes", 5),
    new Ingredient("Cabbage", 1),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredientByIndex(index: number) {
    return this.ingredients[index];
  }

  addItem(newItem: Ingredient) {
    this.ingredients.push(newItem);
    this.shoppingItems.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.shoppingItems.emit(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.shoppingItems.emit(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.shoppingItems.emit(this.ingredients.slice());
  }
}