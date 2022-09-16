import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonFilesRoutingModule } from './common-files-routing.module';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FooterComponent } from './footer/footer.component';
import { AboutusComponent } from './aboutus/aboutus.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AboutusComponent,
  ],
  imports: [
    CommonModule,
    CommonFilesRoutingModule,
    NgbModule,
    MatTabsModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ]
})
export class CommonFilesModule { }
