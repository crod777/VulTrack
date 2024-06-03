

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root'
})
export class PoamApproveService {
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

  async getPoamApprovers(id: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get<any>(`http://localhost:8086/${this.vultrackApiBase}/poamApprovers/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async updatePoamApprover(approver: any) {
        const headers = await this.getAuthHeaders();
		return this.http
      .put<any>(`http://localhost:8086/${this.vultrackApiBase}/poamApprover`, approver, { headers })
      .pipe(catchError(this.handleError));
  }
}
