import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { CometChat } from "@cometchat-pro/chat";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  customerimg = '../../../assets/images/customers/Avatar-1.png'
  customerimg2 = '../../../assets/images/customers/Avatar-2.png'
  customerimg3 = '../../../assets/images/customers/Avatar-3.png'
  customerimg4 = '../../../assets/images/customers/Avatar-4.png'
  customerimg5 = '../../../assets/images/customers/Avatar-5.png'
  delete = '../../../assets/images/icons/delete-chat.png'
  shopchat = '../../../assets/images/icons/shop-chat.png'
  infochat = '../../../assets/images/icons/info-chat.png'
  chatdots = '../../../assets/images/icons/chat-dots.png'
  send = '../../../assets/images/icons/send.svg'
  prochat = '../../../assets/images/property-chat-page.png'
  bedsvg = '../../../assets/images/icons/bedchat.svg'
  bathsvg = '../../../assets/images/icons/bathchat.svg'
  squaremetersvg = '../../../assets/images/icons/chatdistance.svg'
  activecheckmark = '../../../assets/images/icons/green-checkmark.svg'
  editor: any;
  appID = "2173199d8a09c313";
  region = "us";
  authKey: any = "4f15afe33d331b063da46dd5aa28b863e9e656d3";
  userID: any;
  userName: any;
  initComplete: boolean = false;
  userData: any;
  userLogin: boolean = false;
  toolbar: Toolbar = [
    ['image'],
    ['link'],
    ['bold'],
    ['italic'],
    ['ordered_list'],
    ['bullet_list'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  constructor() {
    this.userData = localStorage.getItem("user");
    this.userData = JSON.parse(this.userData);
    this.init();
    $("html, body").css("height", "100%");
  }
  init() {
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(this.region)
      .build();
    CometChat.init(this.appID, appSetting).then(
      () => {
        this.initComplete = true;
        this.loginUser(this.userData.id.toString());
      },
      (error) => {
      }
    );
  }
  createUser(id: string, name: string) {

    var user = new CometChat.User(id);
    user.setName(name);
    CometChat.createUser(user, this.authKey).then(
      user => {
        this.loginUser(this.userData.id.toString());
      }, error => {
      }
    )
  }
  loginUser(id: string) {
    CometChat.login(id, this.authKey).then(
      (user) => {
        this.userLogin = true;
      },
      (error: any) => {
        if (error.message == "The UID " + id + " does not exist, please make sure you have created a user with UID " + id + ".") {
          this.createUser(id, this.userData.fullName);
        }
      }
    );
  }
  ngOnInit(): void {
    this.editor = new Editor();
  }
  ngOnDestroy(): void {
    this.editor.destroy();
    $("html, body").removeAttr("style");
  }
  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }
  status2: boolean = false;
  clickEvent1() {
    this.status2 = !this.status2;
  }
  status3: boolean = false;
  clickEvent2() {
    this.status3 = !this.status3;
  }
}
