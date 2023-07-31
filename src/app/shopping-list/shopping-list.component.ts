import { Component } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent {
  public ingredients: Ingredient[] = [
    new Ingredient("Tomatoes", 5),
    new Ingredient("Cabbage", 1),
  ];

  addShoppingItem(newItem: Ingredient) {
    this.ingredients.push(newItem);
  }
}
