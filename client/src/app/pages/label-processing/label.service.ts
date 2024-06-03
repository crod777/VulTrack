

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Label } from './label.model';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
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

  async getLabels(collectionId: string) {
        const headers = await this.getAuthHeaders();
		return this.http
      .get(`http://localhost:8086/${this.vultrackApiBase}/labels/${collectionId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getLabel(collectionId: string, labelId: string) {
        const headers = await this.getAuthHeaders();
		return this.http
      .get(`http://localhost:8086/${this.vultrackApiBase}/label/${collectionId}/${labelId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async addLabel(collectionId: string, label: any) {
        const headers = await this.getAuthHeaders();
		return this.http
      .post<Label>(`http://localhost:8086/${this.vultrackApiBase}/label/${collectionId}`, label, { headers })
      .pipe(catchError(this.handleError));
  }

  async updateLabel(collectionId: string, label: any) {
        const headers = await this.getAuthHeaders();
		return this.http
      .put<Label>(`http://localhost:8086/${this.vultrackApiBase}/label/${collectionId}`, label, { headers })
      .pipe(catchError(this.handleError));
  }

  async deleteLabel(collectionId: string, labelId: string) {
        const headers = await this.getAuthHeaders();
		return this.http
      .delete<Label>(`http://localhost:8086/${this.vultrackApiBase}/label/${collectionId}/${labelId}`, { headers })
      .pipe(catchError(this.handleError));
  }
}
