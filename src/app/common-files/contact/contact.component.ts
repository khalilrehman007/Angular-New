import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../service/notification.service";
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  image:any;
  title:any;
  subHeading:any;

  conductList = [
    {
      value: 'Summary valuation  Certificate report',
      text: "Summary Report"
    },
    {
      value: 'Detailed  valuation  Certificate report',
      text: "Detailed Report"
    },
  ]
  conductReport:string = "";
  constructor(private service: AuthService,private route:Router,private notifyService : NotificationService, private api:AppService) {
    $(window).scrollTop(0);
    this.api.TermsCondition().subscribe((result:any)=> {
      this.title = result.data.pageCaptionHelight;
      this.subHeading = result.data.pageCaptionText;
      this.image = "https://beta.ovaluate.com/" + result.data.fileUrl;
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
