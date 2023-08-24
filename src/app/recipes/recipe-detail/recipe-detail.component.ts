import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeServices } from '../recipe.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingListServices } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  public selectedRecipe!: Recipe;
  public id!: number;

  constructor(private route: ActivatedRoute, private router: Router, private recipeServices: RecipeServices, private shoppingListService: ShoppingListServices) {}

  addToShoppingList(ingredients: Ingredient[]) {
    // console.log("ingredients:", ingredients);
    this.shoppingListService.addIngredients(ingredients);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      this.selectedRecipe = this.recipeServices.getRecipe(this.id);
    })
  }

  handleEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  handleDelete() {
    this.recipeServices.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
