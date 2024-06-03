

import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService } from "@nebular/theme";
import { Router } from '@angular/router';

@Component({
  selector: 'vultrack-consent',
  templateUrl: './dod-consent.component.html',
})
export class DoDConsentComponent implements AfterViewInit {
  modalWindow: any;

  constructor(
    private router: Router,
    private dialogService: NbDialogService,
  ) { }

  @ViewChild('consentTemplate') consentTemplate!: TemplateRef<any>;

  async ngAfterViewInit() {
    this.modalWindow = this.dialogService.open(this.consentTemplate);
  }

  async consentOk() {
      this.router.navigate(['/poam-processing']);
  }

}
