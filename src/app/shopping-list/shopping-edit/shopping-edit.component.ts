import { Component, OnInit, ViewChild, EventEmitter,Output, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') ngForm:NgForm;
  subscription:Subscription;
  editMode:boolean = false;
  editedItemIndex:number;
  editIngredient: Ingredient;

  // @Output() addedIngredient = new EventEmitter<Ingredient>();
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
    .subscribe((index:number)=>{
      this.editedItemIndex = index;
      this.editMode = true;
      this.editIngredient = this.shoppingListService.getIngredient(index);
      this.ngForm.reset({
        'name':this.editIngredient.name,
        'amount':this.editIngredient.amount
      });
    });
  }

  // @ViewChild('nameInput') nameInputRef:ElementRef;
  // @ViewChild('amountInput') amountInputRef:ElementRef;

  onSubmit(form:NgForm){
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(form.value.name,form.value.amount);
    if(this.editMode){
        this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient);
    }else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onClear(){
    this.ngForm.reset();
    this.editMode = false;    
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();

  }

}
