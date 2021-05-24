import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class AuthGuardService implements CanActivate{

    constructor(private authService:AuthService,
        private router:Router){}

    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
        return this.authService.user.pipe(
            take(1),
            map(user=>{
                if(!!user){
                    return true;
                }
            return this.router.createUrlTree(['/auth']);
        }));
    }
}