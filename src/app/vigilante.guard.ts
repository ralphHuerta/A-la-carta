import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VigilanteGuard implements CanActivate {
  constructor(private router : Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let dataLoging= localStorage.getItem("dataLoging")
      let localAcces= false;
      if(dataLoging){
        localAcces= true
      }else{
        this.router.navigate(['/login']);
      }
      
    return localAcces;
  }

  canNOActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let dataLoging= localStorage.getItem("dataLoging")
      let localAcces= true;
      if(dataLoging){
        localAcces= false
      }else{
        this.router.navigate(['/home']);
      }
      
    return localAcces;
  }
  
}
