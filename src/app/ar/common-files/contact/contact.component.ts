import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { AppService } from 'src/app/service/app.service';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  baseUrl:string=environment.apiUrl;
  image:any;
  title:any;
  subHeading:any;

  conductList = [
    {
      value: 'تقرير شهادة التقييم الموجز',
      text: "تقرير ملخص"
    },
    {
      value: 'تقرير شهادة تثمين مفصل',
      text: "تقرير تفاصيل"
    },
  ]
  conductReport:string = "";
  constructor(private service: AuthService,private route:Router,private notifyService : NotificationService, private api:AppService) {
    $(window).scrollTop(0);
    this.api.TermsCondition().subscribe((result:any)=> {
      this.title = result.data.pageCaptionHelightAr;
      this.subHeading = result.data.pageCaptionTextAr;
      this.image = this.baseUrl + result.data.fileUrl;
      this.image = this.image.replaceAll("\\", "/");
      $(".inner-page-banner-sec").css({"background-image":"url('"+this.image+"')"})
      $(".inner-banner-heading p").append(this.subHeading);
    })
  }

  query: number = -1;
  onQuerySelect(e: any) {
    this.conductReport = e.value;
  }
  Form = new FormGroup({
    Name: new FormControl("", Validators.required),
    Phone: new FormControl("", Validators.required),
    Email: new FormControl("  ", [Validators.required,Validators.email]),
  });
  get name(){
    return this.Form.get("Name");
  }
  get phone(){
    return this.Form.get("Phone");
  }
  get email(){
    return this.Form.get("Email");
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.conductReport == "" || this.Form.invalid) {
      alert("Please select all required Fields");
      return;
    }
    let temp:any = {"Name": this.Form.value.Name, "Phone":this.Form.value.Phone,"Email": this.Form.value.Phone, "Query": this.conductReport};
    this.api.AddContactUs(temp).subscribe((result : any) => {
      if( result.message == "Your Request  submitted successfully"){
        alert("Messege sent sucessfully.")
      }
      else {
        alert("Something went wrong.")
      }
    })
  }
}
