

import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'confirmation-dialog',
  styleUrls: ['./confirmation-dialog.component.scss'],
  template: `
    <nb-card style="width: auto; max-width: 40vw; height: auto; max-height: 20vh;">
      <nb-card-header style="text-align: center;">
        <h3>{{ options.header }}</h3>
      </nb-card-header>
      <nb-card-body style="text-align: center;">
        <p>{{ options.body }}</p>
      </nb-card-body>
      <nb-card-footer>
        <div style="text-align:center; margin-right: 0.75rem; margin-left: 0.75rem; margin-bottom: 0rem;">
          <button nbButton style="margin-left: 10%;" outline status='warning' (click)="cancel()" *ngIf="options.cancelbutton === 'true'">Cancel</button>
          <button nbButton style="margin-left: 5%;" outline [status]="options.button.status" (click)="confirm()">{{ options.button.text }}</button>
          <button *ngIf="options.convertButton" (click)="convert()" nbButton style="margin-left: 5%;" outline status="warning">{{ options.convertButton.text }}</button>
        </div>
      </nb-card-footer>
    </nb-card>
  `,
})
export class ConfirmationDialogComponent {
  @Input() options!: ConfirmationDialogOptions;

  constructor(protected dialogRef: NbDialogRef<ConfirmationDialogComponent>) { }

  cancel() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }

  convert() {
    this.dialogRef.close({ convert: true });
  }
}

export class ConfirmationDialogOptions {
  header: string;
  body: string;
  button: { text: string; status: string };
  cancelbutton: string;
  convertButton?: { text: string };

  constructor({
    header,
    body,
    button,
    cancelbutton,
    convertButton,
  }: {
    header?: string;
    body?: string;
    button?: { text: string; status: string };
    cancelbutton?: string;
    convertButton?: { text: string };
  }) {
    this.header = header || 'Confirmation';
    this.body = body || 'Are you sure you wish to continue?';
    this.button = button || { text: 'confirm', status: 'primary' };
    this.cancelbutton = cancelbutton || 'true';
    this.convertButton = convertButton;
  }
}
