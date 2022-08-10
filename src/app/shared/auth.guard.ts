import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import {NotificationService} from "../service/notification.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service:AuthService,private route:Router,private notifyService : NotificationService){
  }
  canActivate(){
    // if(this.service.IsLoggedIn()){
    // return true;
    // }else{
    //   this.route.navigate(['login'])
    //   return false;
    // }


    if (!this.service.isAuthenticated()) {
      this.notifyService.showError('You not having access', "");
      this.route.navigate(['login']);
      return false;
    }
    // this.notifyService.showSuccess('Welcome To Your Profile.', "");
    return true;
  }

}
