import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import jsonDoc from './doc';

@Component({
  selector: 'app-chating',
  templateUrl: './chating.component.html',
  styleUrls: ['./chating.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatingComponent implements OnInit {
  customerimg= '../../../assets/images/customers/Avatar-1.png'
  customerimg2= '../../../assets/images/customers/Avatar-2.png'
  customerimg3= '../../../assets/images/customers/Avatar-3.png'
  customerimg4= '../../../assets/images/customers/Avatar-4.png'
  customerimg5= '../../../assets/images/customers/Avatar-5.png'
  delete= '../../../assets/images/icons/delete-chat.png'
  shopchat= '../../../assets/images/icons/shop-chat.png'
  infochat= '../../../assets/images/icons/info-chat.png'
  chatdots= '../../../assets/images/icons/chat-dots.png'
  send= '../../../assets/images/icons/send.svg'
  prochat= '../../../assets/images/property-chat-page.png'
  bedsvg = '../../../assets/images/icons/bedchat.svg'
  bathsvg = '../../../assets/images/bathchat.svg'
  squaremetersvg = '../../../assets/images/icons/chatdistance.svg'
  activecheckmark = '../../../assets/images/icons/green-checkmark.svg'
  constructor() { }
  editordoc = jsonDoc;
  editor: Editor;
  toolbar: Toolbar = [
    ['image'],
    ['link'],
    ['bold'],
    ['italic'],
    ['ordered_list'],
    ['bullet_list'],
    // ['underline', 'strike'],
    // ['code', 'blockquote'],
    // ['ordered_list', 'bullet_list'],
    // [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    // ['text_color', 'background_color'],
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
  ngOnInit(): void {
    this.editor = new Editor();
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }
  status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }
  status2: boolean = false;
  clickEvent1(){
      this.status2 = !this.status2;       
  }
  status3: boolean = false;
  clickEvent2(){
      this.status3 = !this.status3;       
  }
}
