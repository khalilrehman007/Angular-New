import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatSelectModule } from '@angular/material/select';
import { NgChartsModule } from 'ng2-charts';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import { CommonFilesModule } from '../common-files/common-files.module';
import { MatNativeDateModule } from '@angular/material/core';
import { TransactionDataModuleRoutingModule } from './transaction-data-module-routing.module';
import { TransactionDataComponent } from './transaction-data/transaction-data.component';
import { DiSideBarModuleModule } from '../di-side-bar-module/di-side-bar-module.module';
import { MatChipsModule } from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';




@NgModule({
  declarations: [
    TransactionDataComponent
  ],
  imports: [
    CommonModule,
    TransactionDataModuleRoutingModule,
    NgChartsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NgbModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatDatepickerModule,
    MatMenuModule,
    NgxSliderModule,
    MatIconModule,
    CommonFilesModule,
    MatNativeDateModule,
    DiSideBarModuleModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class TransactionDataModuleModule { }
