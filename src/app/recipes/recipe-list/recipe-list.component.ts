import { Component, OnDestroy, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeServices } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public recipes: Recipe[] = []; 
  public subscription!: Subscription;

  constructor(private recipeService: RecipeServices) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    
    this.subscription = this.recipeService.addRecipes.subscribe((data: Recipe[]) => {
      this.recipes = data;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
