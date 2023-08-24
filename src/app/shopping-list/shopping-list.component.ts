import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListServices } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Ingredient[] = [];
  public selectedItem!: Ingredient;

  constructor(private shoppingListService: ShoppingListServices) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.shoppingItems.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  } 

  onSelectItem(index: number) {
    this.shoppingListService.editedItemIndex.next(index);
  }
}
