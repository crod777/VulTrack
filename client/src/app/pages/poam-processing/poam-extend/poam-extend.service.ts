

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root'
})
export class PoamExtensionService {
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

  async getPoamExtension(poamId: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get<any>(`http://localhost:8086/${this.vultrackApiBase}/poamExtension/${poamId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async putPoamExtension(extensionData: any) {
        const headers = await this.getAuthHeaders();
		return this.http.put<any>(`http://localhost:8086/${this.vultrackApiBase}/poamExtension`, extensionData, { headers })
      .pipe(catchError(this.handleError));
  }

  async deletePoamExtension(poamId: string) {
        const headers = await this.getAuthHeaders();
		return this.http.delete<any>(`http://localhost:8086/${this.vultrackApiBase}/poamExtension/${poamId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getPoamExtensionMilestones(poamId: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get<any>(`http://localhost:8086/${this.vultrackApiBase}/poamExtensionMilestones/${poamId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async addPoamExtensionMilestone(poamId: string, milestone: any) {
        const headers = await this.getAuthHeaders();
		return this.http
      .post<any>(`http://localhost:8086/${this.vultrackApiBase}/poamExtensionMilestones/${poamId}`, milestone, { headers })
      .pipe(catchError(this.handleError));
  }

  async updatePoamExtensionMilestone(poamId: string, milestoneId: string, milestone: any) {
        const headers = await this.getAuthHeaders();
		return this.http
      .put<any>(`http://localhost:8086/${this.vultrackApiBase}/poamExtensionMilestones/${poamId}/${milestoneId}`, milestone, { headers })
      .pipe(catchError(this.handleError));
  }

  async deletePoamExtensionMilestone(poamId: string, milestoneId: string, requestorId: any, extension: boolean) {
    const requestBody = { requestorId: requestorId, extension: extension };
    const headers = await this.getAuthHeaders();
    const options = {
      ...{ headers },
      body: requestBody
    };
		return this.http.delete<any>(`http://localhost:8086/${this.vultrackApiBase}/poamExtensionMilestones/${poamId}/${milestoneId}`, options);
  }
}
