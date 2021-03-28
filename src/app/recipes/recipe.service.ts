import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{

    constructor(private shoppingListService:ShoppingListService){}
    private recipes: Recipe[] = [
        new Recipe('Chicken leg piece',
        'yummy leg',
        'https://www.simplyrecipes.com/thmb/3Jvlt6Cnqzvsi8d6j3t-uJuE8eM=/1600x900/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2010__06__tandoori-chicken-horiz-a-1600-a92053df1c764ee1beaa91ae6383dcfd.jpg',
        [new Ingredient('Chicken',1),
         new Ingredient('Chilly Powder',1)]),
        new Recipe('Mutton Biryani',
        'Bumper biryani',
        'https://c.ndtvimg.com/2019-02/45dlkeqo_mutton-biryani_625x300_27_February_19.jpg',
        [new Ingredient('Mutton',1),
        new Ingredient('Rice',1)])
      ];
    
    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(id:number){
        return this.recipes.slice()[id];
    }

    addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);       
    }
}