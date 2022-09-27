import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { NotificationService } from 'src/app/service/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/service/app.service';
import { AuthService } from 'src/app/service/auth.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs';
interface LanguagesList {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  togglesvg = '../../../assets/images/icons/toggle.svg'
  logo = '../../../assets/images/logo.svg'
  chartsvg = '../../../assets/images/Charts-nav.svg'
  signinsvg = '../../../assets/images/user.svg'
  flagsvg = '../../../assets/images/aed-fg.svg'
  close = '../../../assets/images/icons/close.svg'
  property = '../../../assets/images/shortlisted-img.png'
  trash = '../../../assets/images/icons/Trash-dotted.svg'
  logoutimg = '../../../assets/images/logout-popup-banner.png'
  propertynotFound= '../../../assets/images/icons/property-not-found.svg'
  loggedInUser = localStorage.getItem('user')
  user: any
  availableClasses: string[] = ["sidebar-active", "nosidebar"];
  currentClassIdx: number = 0;
  headerCountries: any;
  userId: any;
  baseUrl = 'https://beta.ovaluate.com/'

  params: any = {};
  bodyClass: any;
  notificationData: any = [];
  currentDate: any = new Date();
  currentTime: any;
  userData: any = "";

  activeTabBuy: any = false;
  activeTabRent: any = false;
  activeTabBlog: any = false;
  activeTabArea: any = false;
  activeShortterm: any = false;
  notificationcount:number = 0;
  constructor(private router: Router, private activeRoute: ActivatedRoute, private authService: AuthService, private route: Router, private notifyService: NotificationService, private modalService: NgbModal, private service: AppService, private db: AngularFireDatabase) {
    let a: any = this.currentDate;
    a = a.toString().split(" ")[5].split("T")[1];
    let sign = a.split('')[0];
    let hours: any = parseInt(a.split('')[1] + a.split('')[2]);
    let minutes: any = parseInt(a.split('')[3] + a.split('')[4]);
    if (sign == "-") {
      this.currentDate.setHours(this.currentDate.getHours() + hours);
      this.currentDate.setMinutes(this.currentDate.getMinutes() + minutes);
    } else {
      this.currentDate.setHours(this.currentDate.getHours() - hours);
      this.currentDate.setMinutes(this.currentDate.getMinutes() - minutes);
    }
    this.currentTime = this.currentDate.getTime();
    if (localStorage.getItem("user")) {
      this.userData = localStorage.getItem("user");
      this.userData = JSON.parse(this.userData).firebaseId;
      db.list("/Notifications/" + this.userData).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, value: c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.notificationData = data;
        let temp:any = [];
        for(let i = this.notificationData.length-1; i >=0; i--) {
          temp.push(this.notificationData[i]);
        }
        this.notificationData = temp;
        this.getNotificationCount();
      });
    }
    this.getUser();
    this.bodyClass = this.availableClasses[this.currentClassIdx];
    this.changeBodyClass();
    this.params = { queryParams: { type: 'Rent', PropertyListingTypeId: 1 } };

    this.service.LoadCountries().subscribe((result: any) => {
      this.headerCountries = result.data;
    })

    let userId = '';
    if (this.user !== null) {
      userId = this.user.id;
    }
    this.userId = userId;

    this.getWishlisting();
    this.getCountData('');


    let type: any = this.activeRoute.snapshot.queryParamMap.get('type');
    let url = this.router.url.replace("/", "");
    url = url.split('?')[0];

    if (type == "Rent") {
      this.activeTabRent = true;
      this.activeTabBuy = false;
      this.activeTabBlog = false;
      this.activeTabArea = false;
    } else if (type == "Buy") {
      this.activeTabBuy = true;
      this.activeTabRent = false;
      this.activeTabBlog = false;
      this.activeTabArea = false;
    }

    if (url == 'blog') {
      this.activeTabBuy = false;
      this.activeTabRent = false;
      this.activeTabBlog = true;
      this.activeTabArea = false;
    } else if (url == 'explore') {
      this.activeTabBuy = false;
      this.activeTabRent = false;
      this.activeTabBlog = false;
      this.activeTabArea = true;
    }





  }

  getNotificationCount() {
    let count:any = 0;
    for (let i = 0; i < this.notificationData.length; i++) {
      if(!this.notificationData[i].value.HasSeen) {
        count++;
      }
    }
    this.notificationcount = count;
  }
  sidebar = [
    {
      src: '../../../assets/images/icons/login.svg',
      class: 'nav-items sign-in',
      text: this.loggedInUser == null ? 'Sign in' : JSON.parse(this.loggedInUser).fullName,
      link: this.loggedInUser == null ? 'login' : 'profile',
    },
    {
      src: '../../../assets/images/icons/ioi.svg',
      class: 'nav-items buy',
      text: 'شراء',
      link: 'property/search/Buy',
    },
    {
      src: '../../../assets/images/icons/rent-icon.svg',
      class: 'nav-items buy',
      text: 'إيجار',
      link: 'property/search/Rent',
    },
    {
      src: '../../../assets/images/icons/sell.svg',
      class: 'nav-items sell',
      text: 'بيع',
      link: 'sellrent',
    },
    {
      src: '../../../assets/images/icons/find-agents.svg',
      class: 'nav-items find-agents',
      text: 'ابحث عن وكيل',
      link: 'find-agent',
    },
    {
      src: '../../../assets/images/icons/world.svg',
      class: 'nav-items guide',
      text: 'خطوط إرشاد',
      link: 'explore',
    },
    {
      src: '../../../assets/images/icons/book.svg',
      class: 'nav-items blog',
      text: 'مقالات',
      link: 'blog',
    },
    {
      src: '../../../assets/images/icons/building.svg',
      class: 'nav-items valuation',
      text: 'تقييم العقارات',
      link: 'valuation',
    },
    {
      src: '../../../assets/images/icons/sell-property-tab.svg',
      class: 'nav-items sellrentproperty',
      text: 'بيع/إيجار العقارات',
      link: 'sellrent',
    },
    {
      src: '../../../assets/images/icons/data-intelligence.svg',
      class: 'nav-items data-intelligence',
      text: 'ذكاء البيانات',
      link: 'dashboard-reports',
    },
    {
      src: '../../../assets/images/icons/classified.svg',
      class: 'nav-items classified',
      text: 'مبوب',
      link: 'classified',
    },
    {
      src: '../../../assets/images/icons/wallet.svg',
      class: 'nav-items my-wallet',
      text: 'My Wallet',
      link: 'profile',
    }
  ]

  getTime(e: any) {
    let temp: any = new Date(e).getTime()
    let difference: any = this.currentTime - temp;
    let days: any = Math.floor(difference / 1000 / 60 / (60 * 24));
    let time: any = new Date(difference);
    if (days > 365) {
      return Math.floor(days / 365) + " years ago";
    } else if (days < 365 && days > 30) {
      return Math.floor(days / 30) + " months ago";
    } else if (days < 30 && days > 1) {
      return days + " days ago";
    } else if (days == 1) {
      return days + " day ago";
    } else if (time.getHours() > 0) {
      return time.getHours() + " hours ago";
    } else if (time.getMinutes() > 0) {
      return time.getMinutes() + " minutes ago";
    } else {
      return time.getSeconds() + " secoonds ago";
    }
  }

  changeBodyClass() {
    // get html body element
    const bodyElement = document.body;

    if (bodyElement) {


      this.currentClassIdx = this.getNextClassIdx();
      const nextClass = this.availableClasses[this.currentClassIdx];
      const activeClass = this.availableClasses[this.getPrevClassIdx()];

      // remove existing class (needed if theme is being changed)
      bodyElement.classList.remove(activeClass);
      // add next theme class
      bodyElement.classList.add(nextClass);

      this.bodyClass = nextClass;
    }
  }

  getPrevClassIdx(): number {
    return this.currentClassIdx === 0
      ? this.availableClasses.length - 1
      : this.currentClassIdx - 1;
  }

  getNextClassIdx(): number {
    return this.currentClassIdx === this.availableClasses.length - 1
      ? 0
      : this.currentClassIdx + 1;
  }
  ngOnInit() {
  }
  getUser() {
    this.user = localStorage.getItem('user');
    if (this.user != '') {
      this.user = JSON.parse(this.user);
    }
    return this.user;
  }
  logout() {
    this.notifyService.showSuccess('Logout Successfully', "");
    localStorage.clear();
    this.getUser();
    this.route.navigate([''])
  }
  status: boolean = false;
  clickEvent() {
    if (!this.authService.isAuthenticated()) {
      this.notifyService.showError('You not having access', "");
      this.route.navigate(['login']);
    } else {
      this.status = !this.status;
      this.getWishlisting();
      this.getCountData('');
      this.status1 = false;
      this.status2 = false;
      this.status3 = false;
    }
  }
  status1: boolean = false;
  clickEvent1() {
    if (!this.authService.isAuthenticated()) {
      this.notifyService.showError('You not having access', "");
      this.route.navigate(['login']);
    } else {
      this.status1 = !this.status1;
      this.status2 = false;
      this.status = false;
      this.status3 = false;
      this.getWishlisting();
      this.getCountData('');
    }
  }
  status2: boolean = false;
  clickEvent2() {
    this.status2 = !this.status2;
    this.status1 = false;
    this.status = false;
    this.status3 = false;
  }
  status3: boolean = false;
  clickEvent3() {
    this.status3 = !this.status3;
    this.status1 = false;
    this.status = false;
    this.status2 = false;
  }
  status4: boolean = false;
  clickEvent4() {
    this.status4 = !this.status4;
    this.status1 = false;
    this.status = false;
    this.status2 = false;
  }
  logOutPopup(content: any) {
    this.modalService.open(content, { centered: true });
  }

  buyCount: any;
  rentCount: any;
  allCount: any;
  getWishlisting() {
    if (this.userId == '' || !this.authService.isAuthenticated()) {
      return;
    }
    let tempData: Array<Object> = []
    this.service.FavoriteListingCount(this.userId).subscribe(data => {
      let response: any = data;
      this.allCount = response.data.all
      this.rentCount = response.data.rent
      this.buyCount = response.data.buy
    });
  }
  getCountChange(e: any) {
    let PropertyListingTypeId: any;
    if (e.index == 1) {
      PropertyListingTypeId = 1
    } else if (e.index == 2) {
      PropertyListingTypeId = 2
    } else {
      PropertyListingTypeId = '';
    }
    this.allCheckbox = [];
    this.rentCheckbox = [];
    this.buyCheckbox = [];
    this.getCountData(PropertyListingTypeId);
  }
  wishlistingDataAll: any = []
  wishlistingDataRent: any = []
  wishlistingDataBuy: any = []
  getCountData(PropertyListingTypeId: any) {
    if (this.userId == '' || !this.authService.isAuthenticated()) {
      return;
    }
    let tempData: Array<Object> = []
    this.service.FavoriteListing({ "UserId": this.userId, "PropertyListingTypeId": PropertyListingTypeId }).subscribe(data => {
      let response: any = data;
      response.data.forEach((element: any, i: any) => {

        let image: any = '';
        if (element.documents !== null && element.documents !== undefined && element.documents.length > 0) {
          image = element.documents[0].fileUrl
        }

        let rentType: any = '';
        if (element.rentType !== null && element.rentType !== undefined && element.propertyListingTypeId != 2) {
          rentType = element.rentType.name
        }

        let propertyType: any = '';
        if (element.propertyType !== null && element.propertyType !== undefined) {
          propertyType = element.propertyType.typeDescription
        }

        tempData.push(
          {
            propertyListingTypeId: element.propertyListingTypeId,
            title: element.propertyTitle,
            rentType: rentType,
            propertyType: propertyType,
            currency: element.country.currency,
            price: element.propertyPrice,
            favorite: element.favorite,
            id: element.id,
            alt: element.propertyTitle,
            src: this.baseUrl + image,
            bedrooms: element.bedrooms,
            propertyAddress: element.propertyAddress,
            bathrooms: element.bathrooms,
            buildingName: element.buildingName,
            carpetArea: element.carpetArea,
          });
      })
    });

    setTimeout(() => {
      if (PropertyListingTypeId == 1) {
        this.wishlistingDataRent = tempData
      } else if (PropertyListingTypeId == 2) {
        this.wishlistingDataBuy = tempData
      } else {
        this.wishlistingDataAll = tempData
      }
    }, 1000);
  }

  wishlistStatus: any;
  removeFavorite(id: any) {
    if (this.userId == '') {
      this.notifyService.showSuccess('First you need to login', "");
      this.route.navigate(['/login'])
    }
    if (!this.authService.isAuthenticated()) {
      this.notifyService.showError('You not having access', "");
      this.route.navigate(['login']);
    }

    this.service.FavoriteAddRemove(true, { "UserId": this.userId, "PropertyListingId": id }).subscribe(data => {
      let responsedata: any = data
      this.wishlistStatus = "Favorite is Removed successfully"
      this.notifyService.showSuccess('Favorite is Removed successfully', "");
    });
    setTimeout(() => {
      this.getCountData('');
      this.getCountData(1);
      this.getCountData(2);
      this.getWishlisting();
    }, 1000);
  }

  allCheckbox: any = []
  allError: any = ""
  allPropertyListingTypeCheck: any;
  allFormCheckbox(id: number, propertyListingTypeId: number) {
    if (this.allPropertyListingTypeCheck != propertyListingTypeId && this.allPropertyListingTypeCheck != undefined) {
      this.notifyService.showWarning("you can't compare two different types", "");
      this.allError = "you can't compare two different types";
    } else {
      this.allCheckbox.push({ 'id': id })
      this.allPropertyListingTypeCheck = propertyListingTypeId
    }

  }

  rentCheckbox: any = []
  rentFormCheckbox(id: number) {
    this.rentCheckbox.push({ 'id': id })
  }

  buyCheckbox: any = []
  buyFormCheckbox(id: number) {
    this.buyCheckbox.push({ 'id': id })
  }

  compareProceed(type: any) {
    if (this.userId == '') {
      this.notifyService.showSuccess('First you need to login', "");
      this.route.navigate(['/login'])
    }
    if (!this.authService.isAuthenticated()) {
      this.notifyService.showError('You not having access', "");
      this.route.navigate(['login']);
    }

    if (type == "all") {
      if (this.allCheckbox.length < 2 || this.allCheckbox.length > 4) {
        this.notifyService.showWarning('Selected property atleast less than < 4 greater than > 2 ', "");
      } else {
        localStorage.removeItem("compareIds");
        localStorage.setItem('compareIds', JSON.stringify(this.allCheckbox))
        this.route.navigateByUrl('/PropertyCompare');
      }
    } else if (type == 'rent') {
      if (this.rentCheckbox.length < 2 || this.rentCheckbox.length > 4) {
        this.notifyService.showWarning('Selected property atleast less than < 4 greater than > 2 ', "");
      } else {
        localStorage.removeItem("compareIds");
        localStorage.setItem('compareIds', JSON.stringify(this.allCheckbox))
        this.route.navigateByUrl('/PropertyCompare');
      }
    } else if (type == "buy") {
      if (this.buyCheckbox.length < 2 || this.buyCheckbox.length > 4) {
        this.notifyService.showWarning('Selected property atleast less than < 4 greater than > 2 ', "");
      } else {
        localStorage.removeItem("compareIds");
        localStorage.setItem('compareIds', JSON.stringify(this.allCheckbox))
        this.route.navigateByUrl('/PropertyCompare');
      }
    }

  }


  checkActiveTab(data: any) {

    if (data == 'buy') {
      this.activeTabBuy = true;
      this.activeTabRent = false;
      this.activeTabBlog = false;
      this.activeTabArea = false;
    } else if (data == 'rent') {
      this.activeTabRent = true;
      this.activeTabBuy = false;
      this.activeTabBlog = false;
      this.activeTabArea = false;
    } else if (data == 'blog') {
      this.activeTabBlog = true;
      this.activeTabRent = false;
      this.activeTabBuy = false;
      this.activeTabArea = false;
    } else if (data == 'areas') {
      this.activeTabArea = true;
      this.activeTabBlog = false;
      this.activeTabRent = false;
      this.activeTabBuy = false;
    }




  }
  language: LanguagesList[] = [
    {value: 'english', viewValue: 'English'},
    {value: 'arabic', viewValue: 'Arabic'}
  ];
  selectedLanguage = this.language[1].value;
  changeLanguage() {
    if(this.route.url.split("?").length == 1) {
      let temp = this.route.url.split("/");
      temp.splice(0,2);
      let url = "";
      for(let i = 0; i < temp.length; i++) {
        url += "/" + temp[i];
      }
      console.log(url);
      this.route.navigate([url]);
    } else {
      let temp = this.route.url.split("?")[0].split("/");
      temp.splice(0,2);
      let url:any = "";
      for(let i = 0; i < temp.length; i++) {
        url += "/" + temp[i];
      }
      url += "?" + this.route.url.split("?")[1];
      window.location.href = url;
    }
  }
}

