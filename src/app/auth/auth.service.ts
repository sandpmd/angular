import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean
}
@Injectable({providedIn:'root'})
export class AuthService{

    user = new BehaviorSubject<User>(null);
    constructor(private http:HttpClient){}

    login(email:string,password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBdfoxIACVWCki2uvr7e6Y163DYqJtwdYA',
        {
            email:email,
            password:password,
            returnSecureToken:true
        })
        .pipe(catchError(this.errorhandle),tap(resData=>{
            this.handleAuthentication(resData.email,resData.localId,
                resData.idToken,resData.expiresIn);
            
        }));
    }

    signup(email:string,password:string){
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBdfoxIACVWCki2uvr7e6Y163DYqJtwdYA',
        {
            email:email,
            password:password,
            returnSecureToken:true
        })
        .pipe(catchError(this.errorhandle),tap(resData=>{
            this.handleAuthentication(resData.email,resData.localId,
                resData.idToken,resData.expiresIn);
            
        }));
    }

    private errorhandle(errRes:HttpErrorResponse){
        let errorMessage = "An unknow error occured";          
            if(errRes.error == null || errRes.error.error == null){
                return throwError(errorMessage);
            }
            switch (errRes.error.error.message) {
                case "EMAIL_EXISTS":
                    errorMessage = "Email Already Exists!"
                    break;
                case "OPERATION_NOT_ALLOWED":
                    errorMessage = "Operation is not allowed";
                    break;
                case "TOO_MANY_ATTEMPTS_TRY_LATER":
                    errorMessage = "Please try later!";
                    break;
                case "EMAIL_NOT_FOUND":
                    errorMessage = "Email not found!"
                    break;
                case "INVALID_PASSWORD":
                    errorMessage = "Invalid Credentials!"
                    break;
                case "USER_DISABLED":
                    errorMessage = "User is Deactivated!"
                    break;
                default:
                    break;
            }
            return throwError(errorMessage);
    }

    private handleAuthentication(email:string,localId:string,idToken:string,expiresIn:string){
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);        
        const user = new User(email,localId,idToken,expirationDate);
        this.user.next(user);
    }
}