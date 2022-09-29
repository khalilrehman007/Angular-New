import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import {NotificationService} from "../service/notification.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private service:AuthService,private route:Router,private notifyService : NotificationService ){

  }
  canActivate(){
   if(this.service.HaveAccess() && this.service.isAuthenticated()){
    return true;
   }else{
     this.notifyService.showError('You not having access', "");
     this.route.navigate(['']);
     return false;
   }
  }

}
