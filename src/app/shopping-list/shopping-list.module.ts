import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent,    
    ],
    imports:[
        RouterModule.forChild([
           {path:'',component:ShoppingListComponent}, 
        ]),
        SharedModule,
        FormsModule
    ]
})
export class ShoppingListModule{

}