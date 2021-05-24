import { Component, ComponentFactoryResolver, 
    ViewChild, ViewContainerRef, OnDestroy, ComponentFactory } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
    selector:'auth-component',
    templateUrl:'./auth.component.html'
})
export class AuthComponent implements OnDestroy{
    
    isLoginMode = true;
    isLoading = false;
    error = null;
    authObs : Observable<AuthResponseData>;
    @ViewChild(PlaceHolderDirective) hostViewer: PlaceHolderDirective;
    closeSubs:Subscription;
    
    constructor(private authService:AuthService,
        private router:Router,
        private componentFactoryResolver:ComponentFactoryResolver){}

    onSubmit(signupForm:NgForm){
        if(!signupForm.valid){
            return;
        }
        const email = signupForm.value.email;
        const password = signupForm.value.password;
        this.isLoading = true;
        if(this.isLoginMode){
           this.authObs = this.authService.login(email,password);
        }else{
            this.authObs = this.authService.signup(email,password);
        }
        this.authObs.subscribe(
            authRes =>{                                 
                this.isLoading = false; 
                this.router.navigate(['/recipes']);                  
            },
            errRes => {
                // this.error = errRes;
                this.errorAlertHandler(errRes);
                this.isLoading = false;
            }
        )
        signupForm.reset();        
    }

    switchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onErrorHandler(){
        this.error = null;
    }

    private errorAlertHandler(errorMessage:string){
        const alertCompFact = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainer = this.hostViewer.viewContainerRef;
        hostViewContainer.clear();
        const alertComponent = hostViewContainer.createComponent(alertCompFact);
        alertComponent.instance.message = errorMessage;
        this.closeSubs = alertComponent.instance.close.subscribe(()=>{
            hostViewContainer.clear();
            this.closeSubs.unsubscribe();
        });
    }

    ngOnDestroy(){
        if(this.closeSubs){
            this.closeSubs.unsubscribe();
        }
        
    }
    
}