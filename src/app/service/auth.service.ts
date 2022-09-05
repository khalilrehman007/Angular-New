import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiurl = 'https://beta.ovaluate.com/api/';

  constructor(private http: HttpClient) {

  }


  public isAuthenticated(): boolean {
    // const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    // return !this.jwtHelper.isTokenExpired(token);

    let token :any=localStorage.getItem('token');
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    if (localStorage.getItem('token') != null && !isExpired) {
      return true;
    }
    return false;
  }

  ProceedLogin(data: any) {
    return this.http.post(this.apiurl + 'Userlogin', data);
  }

  ProceedSignUp(data: any) {
    return this.http.post(this.apiurl + 'UserRegister', data);
  }

  ProceedForgot(data: any) {
    return this.http.post(this.apiurl + 'ForgotPassword', data);
  }

  IsLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  GetToken() {
    return localStorage.getItem('token') || '';
  }

  HaveAccess() {
    var loggintoken = localStorage.getItem('token') || '';
    var _extractedtoken = loggintoken.split('.')[1];
    var _atobdata = atob(_extractedtoken);
    var _finaldata = JSON.parse(_atobdata);
    if (_finaldata.role == 'admin') {
      return true
    } else {
      return false
    }
  }
}
