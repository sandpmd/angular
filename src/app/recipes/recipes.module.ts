import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from '../auth/auth.guard';
import { RecipeResolverService } from './recipe-resolver.service';
import { RecipesRouting } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations:[
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent, 
        RecipeItemComponent, 
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports:[
        RouterModule,
        ReactiveFormsModule,
        RecipesRouting,
        SharedModule
    ]
})
export class RecipesModules{

}