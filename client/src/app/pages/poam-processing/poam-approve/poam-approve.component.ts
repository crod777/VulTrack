

import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SubSink } from 'subsink';
import { NbDialogService } from "@nebular/theme";
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../admin-processing/user-processing/users.service';
import { DatePipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { ConfirmationDialogComponent, ConfirmationDialogOptions } from 'src/app/Shared/components/confirmation-dialog/confirmation-dialog.component';
import { SharedService } from '../../../Shared/shared.service';
import { PoamApproveService } from './poam-approve.service';
import { parseISO, format } from 'date-fns';


@Component({
  selector: 'vultrack-poam-approve',
  templateUrl: './poam-approve.component.html',
  styleUrls: ['./poam-approve.component.scss'],
  providers: [DatePipe]
})
export class PoamApproveComponent implements OnInit, AfterViewInit, OnDestroy {

  private subs = new SubSink()
  modalWindow: any;
  public isLoggedIn = false;
  poam: any;
  poamId: any;
  approvalStatus: any;
  approvedDate: any;
  dates: any = {};
  comments: any;
  selectedCollection: any;
  user: any;
  private subscriptions = new Subscription();

  
  constructor(
    private router: Router,
    private dialogService: NbDialogService,
    private route: ActivatedRoute,
    private userService: UsersService,
    private sharedService: SharedService,
    private poamApproveService: PoamApproveService,
  ) { }

  @ViewChild('approveTemplate') approveTemplate!: TemplateRef<any>;

  public async ngOnInit() {
    this.route.params.subscribe(async params => {
      this.poamId = params['poamId'];
    });
    this.subscriptions.add(
      this.sharedService.selectedCollection.subscribe(collectionId => {
        this.selectedCollection = collectionId;
      })
    );
    this.setPayload();
  }

  async setPayload() {
    this.user = null;
    (await this.userService.getCurrentUser()).subscribe({
      next: (response: any) => {
        if (response && response.userId) {
          this.user = response;
          this.getData();
        } else {
          console.error('User data is not available or user is not active');
        }
      },
      error: (error) => {
        console.error('An error occurred:', error);
      }
    });
  }

  async getData() {
    (await this.poamApproveService.getPoamApprovers(this.poamId)).subscribe({
      next: (response: any) => {
        const userApproval = response.find((approval: any) => approval.userId === this.user.userId);
        if (userApproval) {
          this.approvalStatus = userApproval.approvalStatus;
          this.dates.approvedDate = (userApproval.approvedDate) ? parseISO(userApproval.approvedDate.substr(0, 10)) : '';
          this.comments = userApproval.comments;
        } else {
          this.approvalStatus = null;
          this.approvedDate = null;
          this.comments = null;
        }
      },
      error: (error) => {
        console.error('An error occurred:', error);
      }
    });
  }


 confirm = (dialogOptions: ConfirmationDialogOptions): Observable<boolean> => 
 this.dialogService.open(ConfirmationDialogComponent, {
   hasBackdrop: false,
   closeOnBackdropClick: true,
   context: {
     options: dialogOptions,
   },
 }).onClose;
 
  ngAfterViewInit() {
    this.openModal();
  }

  openModal() {
    this.modalWindow = this.dialogService.open(this.approveTemplate, {
      hasScroll: true,
      hasBackdrop: true,
      closeOnEsc: false,
      closeOnBackdropClick: true,
    });

    this.modalWindow.onClose.subscribe(() => {
      this.router.navigateByUrl(`/poam-processing/poam-details/${this.poamId}`);
    });

    this.modalWindow.componentRef.changeDetectorRef.detectChanges();
    const dialogElement = this.modalWindow.componentRef.location.nativeElement;
    dialogElement.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelApproval() {
    if (this.modalWindow) {
      this.modalWindow.close();
    }
    this.router.navigateByUrl(`/poam-processing/poam-details/${this.poamId}`);
  }

  async submitApprovalData() {
    this.approvedDate = format(this.dates.approvedDate, "yyyy-MM-dd");
    const approvalData = {
      poamId: parseInt(this.poamId, 10),
      userId: this.user.userId,
      approvalStatus: this.approvalStatus,
      approvedDate: this.approvedDate,
      comments: this.comments,
      poamLog: [{ userId: this.user.userId }],
    };

    (await this.poamApproveService.updatePoamApprover(approvalData)).subscribe(
      () => {
        if (this.modalWindow) {
          this.modalWindow.close();
        }

        this.router.navigateByUrl(`/poam-processing/poam-details/${this.poamId}`);
      },
      (error) => {
        console.error('Failed to update POAM Approval:', error);
      }
    );
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
    this.subscriptions.unsubscribe();
  }
}
