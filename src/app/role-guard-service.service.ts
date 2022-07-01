import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './service/auth.service';


import decode from 'jwt-decode';@Injectable()

export class RoleGuardService implements CanActivate {
  user : any
  constructor(public auth: AuthService, public router: Router) {
    this.getUser();
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    // const token = localStorage.getItem('token');
    // decode the token to get its payload
    const tokenPayload = this.user;
    if (!this.auth.isAuthenticated() || tokenPayload.role !== expectedRole) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  getUser(){
    this.user = localStorage.getItem('user');
    if(this.user != ''){
      this.user = JSON.parse(this.user);
    }
    return this.user;
  }
}
