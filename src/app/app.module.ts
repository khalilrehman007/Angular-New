import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptorService } from './service/token-interceptor.service';

import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { initializeApp } from "firebase/app";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { Header2Module } from './header2/header2.module';
// import { ChatComponent } from './chat/chat.component';
// import { CometChatUI } from "../cometchat/CometChatWorkspace/src/components/CometChatUI/CometChat-Ui/cometchat-ui.module";
initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    // ChatComponent
  ],
  imports: [
    BrowserModule,
    MatSelectModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTabsModule,
    MatIconModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule,
    Header2Module,
    // CometChatUI,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right'
    })
  ],
  providers: [
    CookieService, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
  ],
  exports: [
    RouterModule,
    MatTabsModule,
    MatIconModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
