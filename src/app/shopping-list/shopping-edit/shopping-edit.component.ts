import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ShoppingListServices } from '../shopping-list.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('slForm') shoppingListForm!: NgForm;

  public isEdit: boolean = false;
  public editedItemIndex!: number;
  public editedItem!: Ingredient;

  constructor(private shoppingListService: ShoppingListServices) {}

  ngOnInit(): void {
    this.shoppingListService.editedItemIndex.subscribe((itemIndex: number) => {
      this.editedItemIndex = itemIndex;
      this.isEdit = true;
      this.editedItem = this.shoppingListService.getIngredientByIndex(itemIndex);
      this.shoppingListForm.form.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      })
    });
  }

  handleSubmitEvent(slForm: NgForm) {
    const newIngredient = new Ingredient(slForm.value.name, slForm.value.amount)
    if(this.isEdit) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addItem(newIngredient);
    }
    this.isEdit = false;
    slForm.reset();
  }

  handleReset() {
    this.shoppingListForm.reset();
    this.isEdit = false;
  }

  handleDeleteEvent() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.handleReset();
  }
}
