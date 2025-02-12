

import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notifications.service';
import { SubSink } from 'subsink';
import { UsersService } from '../../pages/admin-processing/user-processing/users.service';

interface Permission {
  userId: number;
  collectionId: number;
  accessLevel: number;
}

@Component({
  selector: 'vultrack-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  filteredNotifications: any[] = [];
  filterStatus: string | null = null;
  public isLoggedIn = false;
  user: any;
  payload: any;
  private subs = new SubSink();

  constructor(
    private notificationService: NotificationService,
    private userService: UsersService,
  ) { }

  async ngOnInit() {
      this.setPayload();
      this.resetFilter();
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
    (await this.notificationService.getAllNotificationsByUserId(this.user.userId)).subscribe(
      notifications => {
        this.notifications = notifications;
        this.resetFilter();
      },
      error => {
        console.error('Failed to fetch notifications:', error);
      }
    );
  }

  filterNotifications() {
    if (this.filterStatus === 'Read') {
      this.filteredNotifications = this.notifications.filter(notification => notification.read === 1);
    } else if (this.filterStatus === 'Unread') {
      this.filteredNotifications = this.notifications.filter(notification => notification.read === 0);
    }
  }

  resetFilter() {
    this.filterStatus = null;
    this.filteredNotifications = [...this.notifications];
  }

  async deleteNotification(notification: any) {
    console.log(notification);
    (await this.notificationService.deleteNotificationByNotificationId(notification.notificationId)).subscribe(
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
    if (!this.user || !this.user.userId) {
      console.error('User ID is not available');
      return;
    }
    (await this.notificationService.dismissAllNotificationsByUserId(this.user.userId)).subscribe({
      next: () => {
      },
      error: (error) => {
        console.error('Failed to dismiss all notifications:', error);
      }
    });
  }

  async deleteAllNotifications() {
    if (!this.user || !this.user.userId) {
      console.error('User ID is not available');
      return;
    }
    (await this.notificationService.deleteAllNotificationsByUserId(this.user.userId)).subscribe({
      next: () => {
        console.log('All notifications have been deleted.');
      },
      error: (error) => {
        console.error('Failed to delete all notifications:', error);
      }
    });
    this.notifications = [{ title: "You have no new notifications...", read: 1 }];
    this.filteredNotifications = [{ title: "You have no new notifications...", read: 1 }];
  }
}
