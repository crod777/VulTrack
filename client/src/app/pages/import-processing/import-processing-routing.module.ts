

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { STIGManagerImportComponent } from './stigmanager-import/stigmanager-import.component';
import { TenableImportComponent } from './tenable-import/tenable-import.component';
import { AuthGuard } from '../../auth/auth.guard'

const routes: Routes = [
  { path: 'stigmanager-import', canActivate: [AuthGuard], component: STIGManagerImportComponent },
  { path: 'tenable-import', canActivate: [AuthGuard], component: TenableImportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportProcessingRoutingModule { }
