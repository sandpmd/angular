import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector:'auth-component',
    templateUrl:'./auth.component.html'
})
export class AuthComponent{
    
    isLoginMode = true;
    isLoading = false;
    error = null;
    authObs : Observable<AuthResponseData>;
    

    constructor(private authService:AuthService,
        private router:Router){}

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
                this.authService.user.subscribe(authResponse =>{
                    localStorage.setItem('userData',JSON.stringify(authResponse));
                });                 
                this.isLoading = false; 
                this.router.navigate(['/recipes']);                  
            },
            errRes => {
                this.error = errRes;
                this.isLoading = false;
            }
        )
        signupForm.reset();        
    }

    switchMode(){
        this.isLoginMode = !this.isLoginMode;
    }
}