import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-filtersoftype',
  templateUrl: './filtersoftype.component.html',
  styleUrls: ['../home.component.scss']
})
export class FiltersoftypeComponent implements OnInit {
  categories: any;
  submitted = false;
  responsedata: any;

  constructor(private service:AppService,private route:Router,private notifyService : NotificationService) {
    this.LoadPropertyCategories() 
  }
  search = new FormGroup({
    Name: new FormControl(""),
    Type: new FormControl(""),
    RentalType: new FormControl("")
  });

  ngOnInit(): void {
  }
  ProceedSearch() {
    this.submitted = true;
    if (this.search.invalid) {
      return;
    }
    if (this.search.valid) {
      console.log(this.search.value)
      this.service.ProceedSearch(this.search.value).subscribe(result => {
        if(result!=null ){
          this.responsedata=result;
          this.responsedata.data =this.responsedata.data;
          localStorage.setItem('token',this.responsedata.data.refreshToken)
          localStorage.setItem('user',JSON.stringify(this.responsedata.data))
          this.notifyService.showSuccess(this.responsedata.message, "");
        }else{
          this.notifyService.showError("Unable to login", ""); 
        }
        this.route.navigate([''])
      });
    }
  }
  LoadPropertyCategories(){
    this.service.LoadPropertyCategories().subscribe(data=>{
      this.categories=data;
      // this.categories = this.categories.data
      // 
      this.categories = this.categories.data.filter((category:any, key:any, array:any)=>{
        category.checked = '';
        category.fade = 'fade';
        if(key == 0){
          category.fade = '';
          category.checked = 'active'
        }
        return category;
      })
      
    });
  }

}
