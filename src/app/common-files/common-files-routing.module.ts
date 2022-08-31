import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';
import { TermConditionsComponent } from './term-conditions/term-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { ContactComponent } from './contact/contact.component';
import { InvestorsComponent } from './investors/investors.component';
import { FaqComponent } from './faq/faq.component';

const routes: Routes = [
  { path: 'cookie', component: CookiePolicyComponent },
  { path: 'term-condition', component: TermConditionsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'about-us', component: AboutusComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'investors', component: InvestorsComponent },
  { path: 'faq', component: FaqComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonFilesRoutingModule { }
