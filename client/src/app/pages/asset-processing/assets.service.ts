
import { firstValueFrom, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private vultrackApiBase = 'api';

  constructor(
    private http: HttpClient,
    private oidcSecurityService: OidcSecurityService
  ) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + ` body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  private async getAuthHeaders() {
    const token = await firstValueFrom(this.oidcSecurityService.getAccessToken());
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  async getAssets() {
    const headers = await this.getAuthHeaders();
    return this.http.get<any>(`http://localhost:8086/${this.vultrackApiBase}/assets`, { headers })
    .pipe(catchError(this.handleError));
  }

  async getAssetsByCollection(collectionId: number) {
        const headers = await this.getAuthHeaders();
        return this.http.get<any>(`http://localhost:8086/${this.vultrackApiBase}/assets/collection/${collectionId}`, { headers })
          .pipe(catchError(this.handleError));
      }

  async getLabels(collectionId: any) {
            const headers = await this.getAuthHeaders();
    return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/labels/${collectionId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getAssetLabels(id: any) {
    const headers = await this.getAuthHeaders();
    return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/assetLabels/asset/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getCollection(collectionId: any, userName: string) {
        const headers = await this.getAuthHeaders();
        return this.http.get<any>(`http://localhost:8086/${this.vultrackApiBase}/collection/${collectionId}/user/${userName}`, { headers })
          .pipe(catchError(this.handleError));
  }

  async getCollections(userName: string) {
    const url = `http://localhost:8086/${this.vultrackApiBase}/collections/${userName}`;
        const headers = await this.getAuthHeaders();
        return this.http.get(url, { headers }).pipe(catchError(this.handleError));
  }

  async getCollectionAssetLabel(id: string) {
        const headers = await this.getAuthHeaders();
        return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/metrics/collection/${id}/assetlabel`, { headers })
          .pipe(catchError(this.handleError));
  }

  async postAssetLabel(assetLabel: any) {
        const headers = await this.getAuthHeaders();
        return this.http.post<any>(`http://localhost:8086/${this.vultrackApiBase}/assetLabel`, assetLabel, { headers })
          .pipe(catchError(this.handleError));
  }

  async postAsset(asset: any) {
        const headers = await this.getAuthHeaders();
        return this.http.post<any>(`http://localhost:8086/${this.vultrackApiBase}/asset`, asset, { headers })
          .pipe(catchError(this.handleError));
  }

  async updateAsset(asset: any) {
        const headers = await this.getAuthHeaders();
        return this.http.put<any>(`http://localhost:8086/${this.vultrackApiBase}/asset`, asset, { headers })
          .pipe(catchError(this.handleError));
  }

  async deleteAssetLabel(assetId: any, labelId: any) {
        const headers = await this.getAuthHeaders();
        return this.http.delete<any>(`http://localhost:8086/${this.vultrackApiBase}/assetLabel/asset/${assetId}/label/${labelId}`, { headers })
          .pipe(catchError(this.handleError));
  }

  async deleteAssetsByPoamId(poamId: number) {
        const headers = await this.getAuthHeaders();
        return this.http.delete<any>(`http://localhost:8086/${this.vultrackApiBase}/assets/${poamId}`, { headers })
          .pipe(catchError(this.handleError));
  }
}
