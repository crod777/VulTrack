

import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../notifications.service';
import { SubSink } from 'subsink';
import { UsersService } from '../../../pages/admin-processing/user-processing/users.service';
import { Router } from '@angular/router';

interface Permission {
  userId: number;
  collectionId: number;
  accessLevel: number;
}

@Component({
  selector: 'vultrack-notifications-popover',
  templateUrl: './notifications-popover.component.html',
  styleUrls: ['./notifications-popover.component.scss']
})
export class NotificationsPanelComponent implements OnInit {
  notifications: any[] = [];
  public isLoggedIn = false;
  user: any;
  payload: any;
  private subs = new SubSink();

  constructor(
    private notificationService: NotificationService,
    private userService: UsersService,
    private router: Router,
  ) { }

  async ngOnInit() {
      this.setPayload();
  }

  async setPayload() {
    this.user = null;
    this.payload = null;
    this.subs.sink = (await this.userService.getCurrentUser()).subscribe({
      next: (response: any) => {
        if (response && response.userId) {
          this.user = response;

          if (this.user.accountStatus === 'ACTIVE') {
            this.payload = {
              ...this.user,
              collections: this.user.permissions.map(
                (permission: Permission) => ({
                  collectionId: permission.collectionId,
                  accessLevel: permission.accessLevel,
                })
              ),
            };
            this.fetchNotifications();
          }
        } else {
          console.error('User data is not available or user is not active');
        }
      },
      error: (error) => {
        console.error('An error occurred:', error);
      }
    });
  }

  async fetchNotifications() {
    (await this.notificationService.getUnreadNotificationsByUserId(this.user.userId)).subscribe(
      notifications => {
        notifications.length >= 1 ?
          (this.notifications = notifications) :
          (this.notifications = [{ title: "No new notifications.." }]);
      },
      error => {
        console.error('Failed to fetch notifications:', error);
      }
    );
  }

  async dismissNotification(notification: any) {
    console.log(notification);
    (await this.notificationService.dismissNotificationByNotificationId(notification.notificationId)).subscribe(
      () => {
        const index = this.notifications.indexOf(notification);
        if (index !== -1) {
          this.notifications.splice(index, 1);
        }
      },
      error => {
        console.error('Failed to dismiss notification:', error);
      }
    );
  }

  async dismissAllNotifications() {
    (await this.notificationService.dismissAllNotificationsByUserId(this.user.userId)).subscribe(
      () => {   
      },
      error => {
        console.error('Failed to dismiss notification:', error);
      }
    );
    this.notifications = [{
      title: "No new notifications..",
}];
  }

  viewAllNotifications() {
    this.router.navigateByUrl('/notifications');
  }
}
