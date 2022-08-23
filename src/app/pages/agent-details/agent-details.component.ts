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
  agentDetail: any = {};
  newAgentDetail: any = {};
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

        if(result.data != null){
          this.newAgentDetail.image = (result.data.agentDetails.user.imageUrl !== undefined) ? result.data.agentDetails.user.imageUrl : ''
          this.newAgentDetail.fullName = (result.data.agentDetails.user.fullName !== undefined) ? result.data.agentDetails.user.fullName : ''
          this.newAgentDetail.expertIn = (result.data.agentDetails.expertIn !== undefined) ? result.data.agentDetails.expertIn : ''
          this.newAgentDetail.companyName = (result.data.agentDetails.company.companyName !== undefined) ? result.data.agentDetails.company.companyName : ''
          this.newAgentDetail.phoneNumber = (result.data.agentDetails.user.phoneNumber !== undefined) ? result.data.agentDetails.user.phoneNumber : ''
          this.newAgentDetail.companyAdress = (result.data.agentDetails.company.companyAdress !== undefined) ? result.data.agentDetails.company.companyAdress : ''
          this.newAgentDetail.brnNo = (result.data.agentDetails.brnNo !== undefined) ? result.data.agentDetails.brnNo : ''
          this.newAgentDetail.agentLanguages = (result.data.agentDetails.agentLanguages !== undefined) ? result.data.agentDetails.agentLanguages  : ''
          this.newAgentDetail.agentAreas = (result.data.agentDetails.agentAreas !== undefined) ? result.data.agentDetails.agentAreas : ''
          this.newAgentDetail.salePropertyListingCount = (result.data.salePropertyListingCount !== undefined) ? result.data.salePropertyListingCount : ''
          this.newAgentDetail.rentPropertyListingCount = (result.data.rentPropertyListingCount !== undefined) ? result.data.rentPropertyListingCount : ''
          this.newAgentDetail.commercialPropertyListingCount = (result.data.commercialPropertyListingCount !== undefined) ? result.data.commercialPropertyListingCount : ''
          this.newAgentDetail.aboutMe = (result.data.agentDetails.aboutMe !== undefined) ? result.data.agentDetails.aboutMe : ''

        }

      })
    } else {
      this.service.DisplayAgent({ "PropertyListingId": "", "AgentUserId": this.id, "LoginUserId": "" }).subscribe((result: any) => {
        this.agentDetail = result.data;

        if(result.data != null){
          this.newAgentDetail.image = (result.data.agentDetails.user.imageUrl !== undefined) ? result.data.agentDetails.user.imageUrl : ''
          this.newAgentDetail.fullName = (result.data.agentDetails.user.fullName !== undefined) ? result.data.agentDetails.user.fullName : ''
          this.newAgentDetail.expertIn = (result.data.agentDetails.expertIn !== undefined) ? result.data.agentDetails.expertIn : ''
          this.newAgentDetail.companyName = (result.data.agentDetails.company.companyName !== undefined) ? result.data.agentDetails.company.companyName : ''
          this.newAgentDetail.phoneNumber = (result.data.agentDetails.user.phoneNumber !== undefined) ? result.data.agentDetails.user.phoneNumber : ''
          this.newAgentDetail.companyAdress = (result.data.agentDetails.company.companyAdress !== undefined) ? result.data.agentDetails.company.companyAdress : ''
          this.newAgentDetail.brnNo = (result.data.agentDetails.brnNo !== undefined) ? result.data.agentDetails.brnNo : ''
          this.newAgentDetail.agentLanguages = (result.data.agentDetails.agentLanguages !== undefined) ? result.data.agentDetails.agentLanguages  : ''
          this.newAgentDetail.agentAreas = (result.data.agentDetails.agentAreas !== undefined) ? result.data.agentDetails.agentAreas : ''
          this.newAgentDetail.salePropertyListingCount = (result.data.salePropertyListingCount !== undefined) ? result.data.salePropertyListingCount : ''
          this.newAgentDetail.rentPropertyListingCount = (result.data.rentPropertyListingCount !== undefined) ? result.data.rentPropertyListingCount : ''
          this.newAgentDetail.commercialPropertyListingCount = (result.data.commercialPropertyListingCount !== undefined) ? result.data.commercialPropertyListingCount : ''
          this.newAgentDetail.aboutMe = (result.data.agentDetails.aboutMe !== undefined) ? result.data.agentDetails.aboutMe : ''

        }
      })
    }
    this.service.MyPropertyListings(this.id).subscribe((result: any) => {
      this.myListing = result.data;
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
