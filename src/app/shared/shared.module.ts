import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinner } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { PlaceHolderDirective } from './placeholder/placeholder.directive';

@NgModule({
    declarations:[
        DropdownDirective,
        LoadingSpinner,
        AlertComponent,
        PlaceHolderDirective
    ],
    imports:[CommonModule],
    exports:[
        DropdownDirective,
        LoadingSpinner,
        AlertComponent,
        PlaceHolderDirective,
        CommonModule
    ]
})
export class SharedModule{

}