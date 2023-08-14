import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShoppingListServices } from '../shopping-list.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('amountInput') amountInput!: ElementRef;

  constructor(private shoppingListService: ShoppingListServices) {}

  handleAddEvent() {
    const name = this.nameInput.nativeElement.value;
    const amount = this.amountInput.nativeElement.value;

    this.shoppingListService.addItem(new Ingredient(name, amount));
  }
}
