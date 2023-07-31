import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  @Output() public selectedRecipe = new EventEmitter<Recipe>();

  public selectedRecipeIndex: number = 0;

  public recipes: Recipe[] = [
    new Recipe('Burger Regular', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab incidunt provident reprehenderit fugiat nam minus qui minima rerum quas corporis.', "https://natashaskitchen.com/wp-content/uploads/2023/06/Cheeseburger.jpg"),
    new Recipe('Burger Large', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab incidunt provident reprehenderit fugiat nam minus qui minima rerum quas corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab incidunt provident reprehenderit fugiat nam minus qui minima rerum quas corporis.', "https://natashaskitchen.com/wp-content/uploads/2023/06/Cheeseburger.jpg")
  ];

  ngOnInit(): void {
    this.onClickRecipe(this.recipes[0]);
  }

  onClickRecipe(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
  }
}
