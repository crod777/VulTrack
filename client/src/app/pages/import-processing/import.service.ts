

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  private vultrackApiBase = 'api';

  constructor(
    private http: HttpClient,
    private oidcSecurityService: OidcSecurityService
  ) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  private async getAuthHeaders() {
    const token = await firstValueFrom(this.oidcSecurityService.getAccessToken());
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  async updatePoamAssetsWithStigManagerData(poamAsset: any) {
        const headers = await this.getAuthHeaders();
		return this.http.put(`http://localhost:8086/${this.vultrackApiBase}/update/stigmanager/poamassets`, poamAsset, { headers })
      .pipe(catchError(this.handleError));
  }

  async postStigManagerAssets(assets: any) {
        const headers = await this.getAuthHeaders();
		return this.http.post(`http://localhost:8086/${this.vultrackApiBase}/import/stigmanager/assets`, assets, { headers })
      .pipe(catchError(this.handleError));
  }

  async postStigManagerCollection(data: any) {
        const headers = await this.getAuthHeaders();
		return this.http.post(`http://localhost:8086/${this.vultrackApiBase}/import/stigmanager/collection`, data, { headers })
      .pipe(catchError(this.handleError));
  }
}
