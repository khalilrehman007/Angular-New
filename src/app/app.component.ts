import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { environment } from "../environments/environment";
import { ActivatedRoute, NavigationEnd, Router, RouteConfigLoadStart, RouteConfigLoadEnd  } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NotificationService } from './service/notification.service'
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { data } from 'jquery';
import { AppService } from './service/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements DoCheck, OnInit, AfterViewInit {
  title = 'ovaluate';
  message: any = null;
  displaymenu = false;
  latitude: any = "";
  longitude: any = "";
  currentCountry: any = "";
  countryData: any = "";
  showLoader:boolean = false;
  constructor(private cookie: CookieService, private service: AppService, private route: Router, private notifyService: NotificationService) {
    this.cookie.deleteAll();
    this.route.events.subscribe((val: any) => {
      if (val instanceof RouteConfigLoadStart) {
        this.showLoader = true
      } else if (val instanceof RouteConfigLoadEnd) {
        this.showLoader = false;
      }
      if (val instanceof NavigationEnd) {
        let temp: any = val.url.split("/");
        if (temp[1] == "data-intelligence") {
          $("body").addClass("select-di-dropdown");
        } else {
          $("body").removeClass("select-di-dropdown");
        }
        if (temp[1] == "" || temp[1] == "property") {
          $("body").addClass("drop-align");
        } else {
          $("body").removeClass("drop-align");
        }
        if (temp[1] == "ar") {
          $("html").attr("dir", "rtl");
          $("title").text("OV- المتجر");
        } else {
          $("html").removeAttr("dir");
          $("title").text("OV - Marketplace");
        }
      }
    })
    this.latLng();
  }
  ngAfterViewInit(): void {
    $(".main-loader-wrapper").remove();
  }
  latLng() {
    if (!navigator.geolocation) {
      return;
    }
    function error() {
    }
    navigator.geolocation.getCurrentPosition((position: any) => {

      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      if (!this.cookie.get("countryData")) {
        this.getCountry();
      }
    }, error);
  }
  getCountry() {
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + this.latitude + "," + this.longitude + "&key=AIzaSyBPSEz52-AfPEVbmV_3yuGUGol_KiLb3GU",
      method: "get",
      success: (res: any) => {
        let length: any = res.results.length - 1;
        this.currentCountry = res.results[length].address_components[0].short_name;
        this.loadCountryData();
      }
    });
  }
  loadCountryData() {
    this.service.LoadCountries().subscribe((result: any) => {
      let temp: any = result.data;
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].code == this.currentCountry) {
          this.countryData = temp[i];
          break;
        }
      }
      if (this.countryData == "") {
        this.countryData = temp[0];
      }
      let expire = new Date();
      let time = Date.now() + ((3600 * 1000) * 24);
      expire.setTime(time);
      delete this.countryData.city;
      this.cookie.set("countryData", JSON.stringify(this.countryData), expire);
    })
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
            localStorage.setItem("deviceToken", currentToken);
          }
        }).catch((err) => { });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
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
