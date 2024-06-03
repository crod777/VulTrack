

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTooltipModule,
  NbTreeGridModule,
} from '@nebular/theme';
import { SharedModule } from '../../Shared/shared.module';
import { STIGManagerImportComponent } from './stigmanager-import/stigmanager-import.component';
import { TenableImportComponent } from './tenable-import/tenable-import.component';
import { ImportProcessingRoutingModule } from './import-processing-routing.module';

@NgModule({
  declarations: [
    STIGManagerImportComponent,
    TenableImportComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ImportProcessingRoutingModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NbLayoutModule,
    NbSelectModule,
    NbSpinnerModule,
    NbTabsetModule,
    NbTooltipModule,
    NbTreeGridModule,
    SharedModule,
  ],
  providers: [],
})
export class ImportProcessingModule { }
