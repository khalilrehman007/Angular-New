import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiurl='https://www.ovaluate.com/api/Userlogin';
  
  constructor(private http:HttpClient) {

   }
   ProceedLogin(UserCred:any){
    console.log(UserCred);
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
     return this.http.post(this.apiurl,UserCred,{headers: header});
   }
   IsLoggedIn(){
     return localStorage.getItem('token')!=null;
   }
   GetToken(){
    return localStorage.getItem('token')||'';
   }
   HaveAccess(){
     var loggintoken=localStorage.getItem('token')||'';
     var _extractedtoken=loggintoken.split('.')[1];
     var _atobdata=atob(_extractedtoken);
     var _finaldata=JSON.parse(_atobdata);
     if(_finaldata.role=='admin'){
       return true
     }else{
       alert('you not having access');
       return false
     }
   }
}
