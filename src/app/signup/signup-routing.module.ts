import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpComponent } from './otp/otp.component';
import { SignupComponent } from './signup/signup.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

const routes: Routes = [
  { path: "", component: SignupComponent },
  { path: "otp", component: OtpComponent },
  { path: "thank-you", component: ThankYouComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }