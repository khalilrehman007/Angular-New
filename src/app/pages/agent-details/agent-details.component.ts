import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.scss']
})
export class AgentDetailsComponent implements OnInit {
  bedsvg = 'assets/images/icons/Bed.svg'
  bathsvg = 'assets/images/icons/Bath-tub.svg'
  squaremetersvg = 'assets/images/icons/Square Meters.svg'
  furnishing = 'assets/images/icons/furnishing.svg'
  agentDetail: any;
  id: any;
  user: any;
  myListing: any = [];
  totalLength: number = 0;
  page: number = 1;
  constructor(private service: AppService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.service.id = params['id'];
    })
    this.user = localStorage.getItem("user");
    this.user = JSON.parse(this.user);
    if (this.user != null) {
      this.service.DisplayAgent({ "PropertyListingId": "", "AgentUserId": this.id, "LoginUserId": this.id }).subscribe((result: any) => {
        this.agentDetail = result.data;
      })
    } else {
      this.service.DisplayAgent({ "PropertyListingId": "", "AgentUserId": this.id, "LoginUserId": "" }).subscribe((result: any) => {
        this.agentDetail = result.data;
      })

    }
    this.service.MyPropertyListings(this.id).subscribe((result: any) => {
      this.myListing = result.data;
      console.log(this.myListing);
    })
  }

  pageChanged(value: any) {
    this.page = value;
  }

  agentContact = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
    phone: new FormControl("", Validators.required),
    message: new FormControl("", Validators.required),
  })

  get name() {
    return this.agentContact.get("name")
  }
  get email() {
    return this.agentContact.get("email")
  }
  get phone() {
    return this.agentContact.get("phone")
  }
  get message() {
    return this.agentContact.get("message")
  }

  ngOnInit(): void {
  }

}
