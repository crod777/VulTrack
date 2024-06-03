

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private vultrackApiBase = 'api';

  constructor(
    private http: HttpClient,
    private oidcSecurityService: OidcSecurityService
  ) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  private async getAuthHeaders() {
    const token = await firstValueFrom(this.oidcSecurityService.getAccessToken());
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  async getAllNotificationsByUserId(userId: number) {
        const headers = await this.getAuthHeaders();
		return this.http.get<any[]>(`http://localhost:8086/${this.vultrackApiBase}/notifications/all/${userId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getUnreadNotificationsByUserId(userId: number) {
        const headers = await this.getAuthHeaders();
		return this.http.get<any[]>(`http://localhost:8086/${this.vultrackApiBase}/notifications/unread/${userId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getUnreadNotificationCountByUserId(userId: number) {
        const headers = await this.getAuthHeaders();
		return this.http.get<any[]>(`http://localhost:8086/${this.vultrackApiBase}/notifications/unread/count/${userId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async dismissNotificationByNotificationId(notificationId: number) {
        const headers = await this.getAuthHeaders();
		return this.http.put<any>(`http://localhost:8086/${this.vultrackApiBase}/notifications/dismiss/${notificationId}`, null, { headers })
      .pipe(catchError(this.handleError));
  }

  async dismissAllNotificationsByUserId(userId: number) {
        const headers = await this.getAuthHeaders();
		return this.http.put<any>(`http://localhost:8086/${this.vultrackApiBase}/notifications/all/dismiss/${userId}`, null, { headers })
      .pipe(catchError(this.handleError));
  }

  async deleteNotificationByNotificationId(notificationId: number) {
        const headers = await this.getAuthHeaders();
		return this.http.delete<any>(`http://localhost:8086/${this.vultrackApiBase}/notifications/delete/${notificationId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async deleteAllNotificationsByUserId(userId: number) {
        const headers = await this.getAuthHeaders();
		return this.http.delete<any>(`http://localhost:8086/${this.vultrackApiBase}/notifications/all/delete/${userId}`, { headers })
      .pipe(catchError(this.handleError));
  }
}
