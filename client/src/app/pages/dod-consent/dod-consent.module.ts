

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbSelectModule, NbThemeModule } from '@nebular/theme';
import { Angular2SmartTableModule } from 'angular2-smart-table';
import { DoDConsentComponent } from './dod-consent.component';
import { DodConsentRoutingModule } from './dod-consent.routing';

@NgModule({
    declarations: [
        DoDConsentComponent,
    ],
    exports: [
        DoDConsentComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        DodConsentRoutingModule,
        NbButtonModule,
        NbCardModule,
        NbThemeModule,
        Angular2SmartTableModule,
        NbSelectModule,
    ]
})
export class DoDConsentModule { }
