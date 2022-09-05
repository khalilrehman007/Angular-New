import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat/chat.component';
import { Header2Module } from '../header2/header2.module';
import { CometChatUI } from "../../cometchat/CometChatWorkspace/src/components/CometChatUI/CometChat-Ui/cometchat-ui.module";

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    Header2Module,
    CometChatUI
  ]
})
export class ChatModule { }
