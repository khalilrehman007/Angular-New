import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-new-message',
  templateUrl: './chat-new-message.component.html',
  styleUrls: ['./chat-new-message.component.scss']
})
export class ChatNewMessageComponent implements OnInit {
  messageimg = '../../../assets/images/message-1.svg'
  constructor() { }

  ngOnInit(): void {
  }

}
