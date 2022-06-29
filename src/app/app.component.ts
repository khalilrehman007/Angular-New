import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NotificationService } from './service/notification.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements DoCheck {
  title = 'ovaluate';
  displaymenu=false;
  constructor(private cookie:CookieService,private route:Router,private notifyService : NotificationService){

  }
  showToasterSuccess(){
    this.notifyService.showSuccess("Data shown successfully !!", "Success")
  }

  showToasterError(){
    this.notifyService.showError("Something is wrong", "Fail")
  }

  showToasterInfo(){
    this.notifyService.showInfo("This is info", "Info")
  }

  showToasterWarning(){
    this.notifyService.showWarning("This is warning", "Warning")
  }
  ngDoCheck(): void {
    if (this.route.url == '/login') {
      this.displaymenu = false
    } else {
      this.displaymenu = true
    }
  }

}
