import { NgModule } from '@angular/core';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptors } from './auth/auth-interceptors.service';

@NgModule({
    providers:[
        ShoppingListService,
        RecipeService,
        {
            provide:HTTP_INTERCEPTORS,useClass:AuthInterceptors,multi:true
        } 
    ]
})
export class CoreModule{

}