import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject} from 'rxjs';

export class ShoppingListService{
    addedIngredient = new Subject<Ingredient[]>();
    private ingredients:Ingredient[] = [
        new Ingredient('Apples',10),
        new Ingredient('Tommotes',10)
      ];
    // private ingredients:Ingredient[];

    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredients(ingredient:Ingredient[]){
        this.ingredients.push(...ingredient);
        this.addedIngredient.next(this.ingredients.slice());    
    }

    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.addedIngredient.next(this.ingredients.slice());
    }
}