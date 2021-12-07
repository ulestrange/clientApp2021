import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

private user : User | null = null;

  constructor(private userService: UserService){
    this.userService.user.subscribe( user => this.user = user);
    console.log ('Here ' + this.user?.email)
  }

  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isLoggedIn = ! (this.user == null ) ;
    console.log ('Here ' + this.user?.accessToken);
    console.log('route guard ' + isLoggedIn);

    return isLoggedIn;
  }
  
}
