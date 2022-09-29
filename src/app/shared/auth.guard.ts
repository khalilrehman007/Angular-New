import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  NavigationEnd,
  Router,
  RouterStateSnapshot, RoutesRecognized,
  UrlTree
} from '@angular/router';
import { filter, Observable, pairwise } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { NotificationService } from "../service/notification.service";
import { AppService } from "../service/app.service";
import { Location } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  previousUrl: any;
  routeChange: any;
  constructor(public appService: AppService, private service: AuthService, private route: Router, private notifyService: NotificationService) {

  }

  canActivate() {
    // if(this.service.IsLoggedIn()){
    // return true;
    // }else{
    //   this.route.navigate(['login'])
    //   return false;
    // }

    if (!this.service.isAuthenticated()) {
      this.notifyService.showError("You need to register/login", "");
      this.route.events.subscribe((val: any) => {
        if (val instanceof NavigationEnd) {
          let temp: any = val.url.split("/");
          if (temp[1] == "ar") {
            this.route.navigate(['/ar/login']);
            $("html").attr("dir", "rtl");
            $("title").text("OV- المتجر");
          } else {
            this.route.navigate(['login']);
            $("html").removeAttr("dir");
            $("title").text("OV - Marketplace");
          }
        }
      })
      return false;
    }

    // this.notifyService.showSuccess('Welcome To Your Profile.', "");
    return true;
  }

}
