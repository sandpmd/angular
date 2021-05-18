import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
  // @Output() featureSelected = new EventEmitter<string>();
  private userSub : Subscription;
  isAuthenticated = false;
  constructor(private dataStorageService:DataStorageService,
    private authService:AuthService) { }

  ngOnInit(){
    this.userSub = this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user;
    });
  }

  // onSelect(feature:string){
  //   this.featureSelected.emit(feature)
  // }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchRecipes(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
