import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  apiurl='https://www.ovaluate.com/api/';

  constructor(private http:HttpClient) {
    
  }
  LoadBlogs(){
    return this.http.get(this.apiurl+'blogs');
  }
  LoadBlogById(){
    // console.log(this.blog)
    return this.http.get(this.apiurl+'blog/14');
  }
}
