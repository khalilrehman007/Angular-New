import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonFilesRoutingModule } from './common-files-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';
import { TermConditionsComponent } from './term-conditions/term-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InvestorsComponent } from './investors/investors.component';
import { FaqComponent } from './faq/faq.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AlertsModule } from '../alerts/alerts.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CookiePolicyComponent,
    TermConditionsComponent,
    PrivacyPolicyComponent,
    AboutusComponent,
    HowItWorksComponent,
    ContactComponent,
    InvestorsComponent,
    FaqComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CommonFilesRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AlertsModule,
    NgbModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
})
export class CommonFilesModule { }
