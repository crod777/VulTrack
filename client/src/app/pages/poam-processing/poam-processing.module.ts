

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbAutocompleteModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbRadioModule,
  NbSelectModule,
  NbStepperModule,
  NbTabsetModule,
  NbTagModule,
  NbThemeModule,
  NbToggleModule,
  NbTooltipModule,
  NbTreeGridModule,
} from '@nebular/theme';
import { Angular2SmartTableModule } from 'angular2-smart-table';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { PoamAdvancedPieComponent } from './poam-components/poam-advanced-pie/poam-advanced-pie.component';
import { PoamAssignedGridComponent } from './poam-components/poam-assigned-grid/poam-assigned-grid.component';
import { PoamGridComponent } from './poam-components/poam-grid/poam-grid.component';
import { PoamMainchartComponent } from './poam-components/poam-mainchart/poam-mainchart.component';
import { PoamApproveComponent } from './poam-approve/poam-approve.component';
import { PoamDetailsComponent } from './poam-details/poam-details.component';
import { PoamExtendComponent } from './poam-extend/poam-extend.component';
import { PoamLogComponent } from './poam-log/poam-log.component';
import { PoamManageComponent } from './poam-manage/poam-manage.component';
import { PoamsComponent } from './poams.component';
import { PoamProcessingRoutingModule } from './poam-processing-routing.module';

@NgModule({
  declarations: [
    PoamApproveComponent,
    PoamDetailsComponent,
    PoamExtendComponent,
    PoamLogComponent,
    PoamManageComponent,
    PoamsComponent,
    PoamAdvancedPieComponent,
    PoamAssignedGridComponent,
    PoamGridComponent,
    PoamMainchartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAutocompleteModule,
    NbBadgeModule,
    NbButtonModule,
    NbCardModule,
    NbDatepickerModule,
    NbEvaIconsModule,
    NbFormFieldModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule,
    NbRadioModule,
    NbSelectModule,
    NbStepperModule,
    NbTabsetModule,
    NbTagModule,
    NbThemeModule,
    NbToggleModule,
    NbTooltipModule,
    NbTreeGridModule,
    Angular2SmartTableModule,
    NgxChartsModule,
    InfiniteScrollModule,
    PoamProcessingRoutingModule,
  ],
  providers: [
    provideCharts(withDefaultRegisterables()),
  ],
  exports: [
    PoamAdvancedPieComponent,
    PoamAssignedGridComponent,
    PoamGridComponent,
    PoamMainchartComponent,
  ],
})
export class PoamProcessingModule { }
