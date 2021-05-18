import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private dataStorageService:DataStorageService,
        private recipeService:RecipeService){}

    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[]{
        const recipes = this.recipeService.getRecipes();

        if(recipes.length != 0){
            return recipes;
        }else{
            return this.dataStorageService.fetchRecipes();
        }
    }

}