import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject} from 'rxjs';

export class ShoppingListService{
    addedIngredient = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients:Ingredient[] = [
        new Ingredient('Apples',10),
        new Ingredient('Tommotes',10)
      ];
    // private ingredients:Ingredient[];

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index:number){
        return this.ingredients[index];
    }

    addIngredients(ingredient:Ingredient[]){
        this.ingredients.push(...ingredient);
        this.addedIngredient.next(this.ingredients.slice());    
    }

    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.addedIngredient.next(this.ingredients.slice());
    }

    updateIngredient(index:number, newIngredient:Ingredient){
        this.ingredients[index] = newIngredient;
        this.addedIngredient.next(this.ingredients.slice());
    }

    deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.addedIngredient.next(this.ingredients.slice());
    }
}