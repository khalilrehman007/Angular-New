import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import {NotificationService} from "../service/notification.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../service/app.service';
import {AuthService} from "../service/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  togglesvg = '../../assets/images/icons/toggle.svg'
  logo = '../../assets/images/logo.svg'
  chartsvg = '../../assets/images/Charts-nav.svg'
  signinsvg = '../../assets/images/user.svg'
  flagsvg = '../../assets/images/aed-fg.svg'
  close = '../../assets/images/icons/close.svg'
  property = '../../assets/images/shortlisted-img.png'
  trash = '../../assets/images/icons/Trash-dotted.svg'
  logoutimg = '../../assets/images/logout-popup-banner.png'
  loggedInUser = localStorage.getItem('user')
  user : any
  availableClasses: string[] = ["sidebar-active", "nosidebar"];
  currentClassIdx: number = 0;
  headerCountries: any;
  userId :any;
  baseUrl = 'https://beta.ovaluate.com/'

  params :any = {};
  bodyClass: string;
  constructor(private authService:AuthService,private route:Router,private notifyService : NotificationService,private modalService: NgbModal, private service:AppService) {
    this.getUser();
    this.bodyClass = this.availableClasses[this.currentClassIdx];
    this.changeBodyClass();
    this.params = {queryParams:{type:'Rent',PropertyListingTypeId:1}};

    this.service.LoadCountries().subscribe((result:any)=>{
      this.headerCountries = result.data;
    })

    let userId = '';
    if(this.user !== null){
      userId = this.user.id;
    }
    this.userId = userId;

    this.getWishlisting();
    this.getCountData('');
  }

  sidebar = [
    {
      src: '../../assets/images/icons/login.svg',
      class: 'nav-items sign-in',
      text: this.loggedInUser == null ? 'Sign in' : JSON.parse(this.loggedInUser).fullName,
      link: this.loggedInUser == null ? 'login' : 'profile',
    },
    {
      src: '../../assets/images/icons/ioi.svg',
      class: 'nav-items buy',
      text: 'Buy',
      link: '/search/Buy',
    },
    {
      src: '../../assets/images/icons/rent-icon.svg',
      class: 'nav-items buy',
      text: 'Rent',
      link: '/search/Rent',
    },
    {
      src: '../../assets/images/icons/sell.svg',
      class: 'nav-items sell',
      text: 'Sell',
      link: '/sellrent',
    },
    {
      src: '../../assets/images/icons/find-agents.svg',
      class: 'nav-items find-agents',
      text: 'Find Agents',
      link: '/find-agent',
    },
    {
      src: '../../assets/images/icons/world.svg',
      class: 'nav-items guide',
      text: 'Guide',
      link: 'explore',
    },
    {
      src: '../../assets/images/icons/book.svg',
      class: 'nav-items blog',
      text: 'Blog',
      link: 'blogs',
    }
  ]


  search(name:any){

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
  getUser(){
    this.user = localStorage.getItem('user');
    if(this.user != ''){
      this.user = JSON.parse(this.user);
    }
    return this.user;
  }
  logout(){
    this.notifyService.showSuccess('Logout Successfully', "");
    localStorage.clear();
    this.route.navigate(['login'])
  }
  status: boolean = false;
  clickEvent(){
    if (!this.authService.isAuthenticated()) {
      this.notifyService.showError('You not having access', "");
      this.route.navigate(['login']);
    }else{
      this.status = !this.status;
      this.getWishlisting();
      this.getCountData('');
      this.status1 = false;
      this.status2 = false;
    }
  }
  status1: boolean = false;
  clickEvent1(){
      if (!this.authService.isAuthenticated()) {
        this.notifyService.showError('You not having access', "");
        this.route.navigate(['login']);
      }else{
        this.status1 = !this.status1;
        this.status2 = false;
        this.status = false;
        this.getWishlisting();
        this.getCountData('');
      }
  }
  status2: boolean = false;
  clickEvent2(){
      this.status2 = !this.status2;
      this.status1 = false;
      this.status = false;
  }
  logOutPopup(content) {
    this.modalService.open(content, { centered: true });
  }

  buyCount :any;
  rentCount :any;
  allCount :any;
  getWishlisting() {
    let tempData :Array<Object> = []
    this.service.FavoriteListingCount(this.userId).subscribe(data=>{
      let response: any = data;
      this.allCount = response.data.all
      this.rentCount = response.data.rent
      this.buyCount = response.data.buy
    });
  }
  getCountChange(e:any){
    let PropertyListingTypeId :any ;
    if(e.index == 1){
      PropertyListingTypeId = 1
    }else if(e.index == 2){
      PropertyListingTypeId = 2
    }else{
      PropertyListingTypeId = '';
    }
    this.allCheckbox  = [];
    this.rentCheckbox = [];
    this.buyCheckbox  = [];
    this.getCountData(PropertyListingTypeId);
  }
  wishlistingDataAll :any = []
  wishlistingDataRent :any = []
  wishlistingDataBuy :any = []
  getCountData(PropertyListingTypeId){
    let tempData :Array<Object> = []
    this.service.FavoriteListing({"UserId":this.userId,"PropertyListingTypeId":PropertyListingTypeId}).subscribe(data=>{
      let response: any = data;
      response.data.forEach((element, i) => {

        let image :any ='';
        if(element.documents !== null && element.documents !== undefined && element.documents.length > 0){
          image = element.documents[0].fileUrl
        }

        let rentType :any ='';
        if(element.rentType !== null && element.rentType !== undefined){
          rentType = element.rentType.name
        }

        let propertyType :any ='';
        if(element.propertyType !== null && element.propertyType !== undefined){
          propertyType = element.propertyType.typeDescription
        }

        tempData.push(
          {
            title: element.propertyTitle,
            rentType: rentType,
            propertyType: propertyType,
            currency: element.country.currency,
            price: element.propertyPrice,
            favorite: element.favorite,
            id:element.id,
            alt:element.propertyTitle,
            src:this.baseUrl+image,
            bedrooms:element.bedrooms,
            propertyAddress:element.propertyAddress,
            bathrooms:element.bathrooms,
            buildingName:element.buildingName,
            carpetArea:element.carpetArea,
          });
      })
    });

    setTimeout(() => {
      if(PropertyListingTypeId == 1){
        this.wishlistingDataRent = tempData
      }else if(PropertyListingTypeId == 2){
        this.wishlistingDataBuy = tempData
      }else{
        this.wishlistingDataAll = tempData
      }
    }, 1000);
  }

  wishlistStatus :any;
  removeFavorite(id:any) {
    if(this.userId == ''){
      this.notifyService.showSuccess('First you need to login', "");
      this.route.navigate(['/login'])
    }
    if (!this.authService.isAuthenticated()) {
      this.notifyService.showError('You not having access', "");
      this.route.navigate(['login']);
    }

    this.service.FavoriteAddRemove(true,{"UserId":this.userId,"PropertyListingId":id}).subscribe(data => {
      let responsedata :any = data
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

  allCheckbox :any = []
  allFormCheckbox(id:number){
    this.allCheckbox.push({'id':id})
    console.log(this.allCheckbox);
  }

  rentCheckbox :any = []
  rentFormCheckbox(id:number){
    this.rentCheckbox.push({'id':id})
    console.log(this.rentCheckbox);
  }

  buyCheckbox :any = []
  buyFormCheckbox(id:number){
    this.buyCheckbox.push({'id':id})
    console.log(this.buyCheckbox);
  }

  compareProceed(type:any){
    if(this.userId == ''){
      this.notifyService.showSuccess('First you need to login', "");
      this.route.navigate(['/login'])
    }
    if (!this.authService.isAuthenticated()) {
      this.notifyService.showError('You not having access', "");
      this.route.navigate(['login']);
    }

    if(type == "all"){
      console.log(this.allCheckbox.length)
      if(this.allCheckbox.length < 2 || this.allCheckbox.length > 4){
        this.notifyService.showWarning('Selected property atleast less than < 4 greater than > 2 ', "");
      }else{
        localStorage.removeItem("compareIds");
        localStorage.setItem('compareIds',JSON.stringify(this.allCheckbox))
        this.route.navigateByUrl('/PropertyCompare');
      }
    }else if(type == 'rent'){
      if(this.rentCheckbox.length < 2 || this.rentCheckbox.length > 4){
        this.notifyService.showWarning('Selected property atleast less than < 4 greater than > 2 ', "");
      }else{
        localStorage.removeItem("compareIds");
        localStorage.setItem('compareIds',JSON.stringify(this.allCheckbox))
        this.route.navigateByUrl('/PropertyCompare');
      }
    }else if(type == "buy"){
      if(this.buyCheckbox.length < 2 || this.buyCheckbox.length > 4){
        this.notifyService.showWarning('Selected property atleast less than < 4 greater than > 2 ', "");
      }else{
        localStorage.removeItem("compareIds");
        localStorage.setItem('compareIds',JSON.stringify(this.allCheckbox))
        this.route.navigateByUrl('/PropertyCompare');
      }
    }

  }

}
