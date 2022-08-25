import { Component, DoCheck, OnInit } from '@angular/core';
import { environment } from "../environments/environment";
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NotificationService } from './service/notification.service'
import { getMessaging, getToken, onMessage } from "firebase/messaging";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements DoCheck, OnInit {
  title = 'ovaluate';
  message: any = null;
  displaymenu = false;
  constructor(private cookie: CookieService, private route: Router, private notifyService: NotificationService) {
  }
  ngOnInit(): void {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        this.requestPermission();
        this.listen();
      }
    })
  }
  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging,
      { vapidKey: environment.firebase.vapidKey }).then(
        (currentToken) => {
          if (currentToken) {
            localStorage.setItem("deviceToken",currentToken);
          }
        }).catch((err) => {});
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message = payload;
    });
  }
  showToasterSuccess() {
    this.notifyService.showSuccess("Data shown successfully !!", "Success")
  }

  showToasterError() {
    this.notifyService.showError("Something is wrong", "Fail")
  }

  showToasterInfo() {
    this.notifyService.showInfo("This is info", "Info")
  }

  showToasterWarning() {
    this.notifyService.showWarning("This is warning", "Warning")
  }
  ngDoCheck(): void {
    if (this.route.url == '/login') {
      this.displaymenu = false
    } else {
      this.displaymenu = true
    }
  }
  onActivate() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
