import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  conductList = [
    {
      value: 'Summary valuation  Certificate report'
    },
    {
      value: 'Detailed  valuation  Certificate report'
    },
  ]
  constructor(private service: AuthService,private route:Router,private notifyService : NotificationService) { }
  query: number = -1;
  onQuerySelect(e: any) {
    this.query = e.value;
    console.log(this.query)
  }
  Form = new FormGroup({
    Name: new FormControl("", Validators.required),
    Phone: new FormControl("", Validators.required),
    Email: new FormControl("", Validators.required),
  });

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.Form.value)
    console.log(this.query)
  }


}
