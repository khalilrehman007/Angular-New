import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  apiurl='https://www.ovaluate.com/api/';
  id=0;

  constructor(private http:HttpClient) {
    
  }
  LoadBlogs(){
    return this.http.get(this.apiurl+'blogs');
  }
  LoadBlogById(){
    return this.http.get(this.apiurl+'blog/'+this.id);
  }
}
