

import { Component, OnInit } from '@angular/core';
import { DefaultEditor } from 'angular2-smart-table';

@Component({
  selector: 'smart-table-textarea',
  template: `
    <textarea nbInput fullWidth style="font-size: 14px;" maxlength="2000" [(ngModel)]="value" (ngModelChange)="onChange($event)" class="smartTableTextarea"></textarea>
  `,
})
export class SmartTableTextareaComponent extends DefaultEditor implements OnInit {
  value: string = '';

  constructor() {
    super();
  }

  ngOnInit() {
    this.value = this.cell.getValue();
  }

  onChange(event: any) {
    this.cell.setValue(event);
  }
}
