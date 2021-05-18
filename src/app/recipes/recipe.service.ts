import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{
    recipeChanged = new Subject<Recipe[]>();

    constructor(private shoppingListService:ShoppingListService){}
    private recipes: Recipe[] = [];
    
    setRecipes(recipes:Recipe[]){
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes);
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(id:number){
        return this.recipes.slice()[id];
    }

    addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);       
    }

    addRecipe(newRecipe:Recipe){
        this.recipes.push(newRecipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
    }
}