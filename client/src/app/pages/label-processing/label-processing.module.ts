

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbSpinnerModule, NbTableModule, NbTreeGridModule } from '@nebular/theme';
import { Angular2SmartTableModule } from 'angular2-smart-table';
import { SharedModule } from '../../Shared/shared.module';
import { LabelProcessingComponent } from './label-processing.component';
import { LabelProcessingRoutingModule } from './label-processing.routing';
import { LabelComponent } from './label/label.component';

@NgModule({
  declarations: [
    LabelProcessingComponent,
    LabelComponent,
  ],
  imports: [
    CommonModule,
    LabelProcessingRoutingModule,
    FormsModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbFormFieldModule,
    NbSelectModule,
    NbSpinnerModule,
    NbTableModule,
    NbTreeGridModule,
    Angular2SmartTableModule,
    SharedModule, 
  ],
  exports: [
  ]
})
export class LabelProcessingModule { }
