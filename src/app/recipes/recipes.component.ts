import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeServices } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  viewProviders: [RecipeServices]
})
export class RecipesComponent implements OnInit {
  ngOnInit(): void {
  }
}
