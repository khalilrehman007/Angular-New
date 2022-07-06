import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  apiurl='https://beta.ovaluate.com/api/';
  id=0;
  headers: HttpHeaders = new HttpHeaders ({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
});
  constructor(private http:HttpClient) {
    
  }
  LoadPropertyCategories(){
    return this.http.get(this.apiurl+'PropertyCategories',{headers:this.headers});
  }
  ProceedSearch(data:any){
    return this.http.get(this.apiurl+'PropertyCategories',{headers:this.headers});
  }
  
  LoadPropertyTypes(){
    return this.http.get(this.apiurl+'PropertyType/');
  }

  LoadBlogs(){
    // BlogBanners
    return this.http.get(this.apiurl+'blogs');
  }
  LoadBlogById(){
    return this.http.get(this.apiurl+'blog/'+this.id);
  }
  LoadCountries() {
    return this.http.get(this.apiurl + 'Countries');
  }
  LoadCities(id:number) {
    return this.http.get(this.apiurl + 'Cities/' + id);
  }
  LoadDistrict(id:number) {
    return this.http.get(this.apiurl + 'Districts/' + id);
  }

  
  
  
}
