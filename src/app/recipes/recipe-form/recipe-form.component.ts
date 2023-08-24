import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeServices } from '../recipe.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  public id!: number;
  public isEdit: boolean = false;

  public recipeForm!: FormGroup;

  constructor(private route: ActivatedRoute, private recipeServices: RecipeServices, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.isEdit = params['id'] != null;
      this.initRecipeForm();
    });
  }

  initRecipeForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeIngredients = [];

    if (this.isEdit) {
      const recipe = this.recipeServices.getRecipe(this.id);

      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      if(recipe['ingredients']) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, Validators.required)
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'ingredients': new FormArray(recipeIngredients)
    });
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  onSubmit() {
    if(this.isEdit) {
      // console.log(this.recipeForm.value);
      this.recipeServices.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeServices.addRecipe(this.recipeForm.value);
    }
    
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  addIngredients() {
    const formGroup = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, Validators.required)
    });
    this.ingredients.push(formGroup);
  }

  onDelete(index: number) {
    this.ingredients.removeAt(index);
  }

  validateField(fieldName: string) {
    return !this.recipeForm.get(fieldName)?.valid && this.recipeForm.get(fieldName)?.touched;
  }

  handleCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
