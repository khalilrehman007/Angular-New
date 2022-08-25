import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import jsonDoc from './doc';
import { CometChat } from "@cometchat-pro/chat";
@Component({
  selector: 'app-chating',
  templateUrl: './chating.component.html',
  styleUrls: ['./chating.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatingComponent implements OnInit {
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
  editordoc = jsonDoc;
  editor: Editor;
  appID = "2173199d8a09c313";
  region = "us";
  authKey: any = "4f15afe33d331b063da46dd5aa28b863e9e656d3";
  userID:number;
  userName:string;
  initComplete: boolean = false;
  toolbar: Toolbar = [
    ['image'],
    ['link'],
    ['bold'],
    ['italic'],
    ['ordered_list'],
    ['bullet_list'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  form = new FormGroup({
    editorContent: new FormControl(
      { value: jsonDoc, disabled: false },
      Validators.required()
    ),
  });
  get doc(): AbstractControl {
    return this.form?.get('editorContent') as FormGroup;
  }
  constructor() {
    this.init();
  }
  init() {
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(this.region)
      .build();
    CometChat.init(this.appID, appSetting).then(
      () => {
        console.log("Initialization completed successfully");
        this.initComplete = true;
        this.loginUser("1");
      },
      (error) => {
        console.log("Initialization failed with error:", error);
      }
    );
  }
  createUser(id:string, name:string) {

    var user = new CometChat.User(id);
    user.setName(name);
    CometChat.createUser(user, this.authKey).then(
      user => {
        console.log("user created", user);
      }, error => {
        console.log("error", error);
      }
    )
  }
  loginUser(id:string) {
    CometChat.login(id, this.authKey).then(
      (user) => {
        console.log("Login Successful:", { user });
      },
      (error:any) => {
        if(error.message == "The UID "+ id +" does not exist, please make sure you have created a user with UID "+ id +".") {
          this.createUser(id, "Roshaan");
        }
      }
    );
  }
  ngOnInit(): void {
    this.editor = new Editor();
  }
  ngOnDestroy(): void {
    this.editor.destroy();
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
