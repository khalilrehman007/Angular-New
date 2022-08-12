import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
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
  constructor(private service:AppService) {
    this.service.DisplayAgent(35).subscribe((result:any)=>{
      this.agentDetail= result.data;
      console.log(this.agentDetail)
    })
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
