

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent, ConfirmationDialogOptions } from '../../../Shared/components/confirmation-dialog/confirmation-dialog.component';
import { SharedService } from '../../../Shared/shared.service';


@Component({
  selector: 'vultrack-tenable-import',
  templateUrl: './tenable-import.component.html',
  styleUrls: ['./tenable-import.component.scss']
})
export class TenableImportComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  scanResults: string = '';
  scans: any = [];

  constructor(
    private sharedService: SharedService,
    private dialogService: NbDialogService,
  ) { }

  async ngOnInit() {
  }


  importScans(): void {
    this.sharedService.getTenableScans('id,name')
      .subscribe({
        next: (data: any) => {
          this.scans = data
        },
        error: (error: any) => {
          console.warn('Unable to retrieve list of scans.');
        }
      });
  }

  importScanResults(scanResultId: any): void {
    const fields = 'id,name,description,status,initiator,owner,ownerGroup,repository,scan,job,details,importStatus,importStart,importFinish,importDuration,downloadAvailable,downloadFormat,dataFormat,resultType,resultSource,running,errorDetails,importErrorDetails,totalIPs,scannedIPs,startTime,finishTime,scanDuration,completedIPs,completedChecks,totalChecks,agentScanUUID,agentScanContainerUUID,progress';
    this.sharedService.getTenableScanResults(scanResultId, fields)
      .subscribe({
        next: (data: any) => {
          const plainText = this.parseJsonToPlainText(data);
          this.scanResults = plainText;
        },
        error: (error: any) => {
          this.showPopup('Tenable API key is not properly configured, please contact your VUL-TRACK administrator.');
        }
      });
  }

  parseJsonToPlainText(data: any, indent: string = ''): string {
    let plainText = '';
    Object.keys(data).forEach(key => {
      if (typeof data[key] === 'object' && data[key] !== null) {
        plainText += `${indent}${key}:\n${this.parseJsonToPlainText(data[key], indent + '  ')}`;
      } else {
        plainText += `${indent}${key}: ${data[key]}\n`;
      }
    });
    return plainText;
  }


  showPopup(message: string) {
    const dialogOptions: ConfirmationDialogOptions = {
      header: 'Alert',
      body: message,
      button: { text: 'OK', status: 'info' },
      cancelbutton: 'false'
    };

    this.dialogService.open(ConfirmationDialogComponent, {
      context: {
        options: dialogOptions
      }
    });
  }

  ngOnDestroy() {
  }

  confirm = (dialogOptions: ConfirmationDialogOptions): Observable<boolean> =>
    this.dialogService.open(ConfirmationDialogComponent, {
      hasBackdrop: true,
      closeOnBackdropClick: true,
      context: {
        options: dialogOptions,
      },
    }).onClose;
}
