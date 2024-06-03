

import { OidcSecurityService } from 'angular-auth-oidc-client';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Collections } from './collections.model';

interface CollectionBasicList {
  collectionId: string;
  collectionName: string;
}

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
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
    return throwError(() => error);
  }

  private async getAuthHeaders() {
    const token = await firstValueFrom(this.oidcSecurityService.getAccessToken());
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  async getCollections(userName: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get<Collections[]>(`http://localhost:8086/${this.vultrackApiBase}/collections/${userName}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getCollectionById(id: string) {
		    const headers = await this.getAuthHeaders();
		return this.http
      .get(`http://localhost:8086/${this.vultrackApiBase}/collections/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getCollectionBasicList() {
        const headers = await this.getAuthHeaders();
		return this.http.get<CollectionBasicList[]>(`http://localhost:8086/${this.vultrackApiBase}/collections/basiclist`, { headers })
      .pipe(catchError(this.handleError));
  }

  async addCollection(collection: any) {
		    const headers = await this.getAuthHeaders();
		return this.http
      .post<Collections>(`http://localhost:8086/${this.vultrackApiBase}/collection`, collection, { headers })
      .pipe(catchError(this.handleError));
  }

  async updateCollection(collection: any) {
		    const headers = await this.getAuthHeaders();
		return this.http
      .put<Collections>(`http://localhost:8086/${this.vultrackApiBase}/collection`, collection, { headers })
      .pipe(catchError(this.handleError));
  }

  async deleteCollection(id: string) {
		    const headers = await this.getAuthHeaders();
		return this.http
      .delete<Collections>(`http://localhost:8086/${this.vultrackApiBase}/collections/${id}`, { headers })
      .pipe(catchError(this.handleError))  
			.subscribe();
	}

  async getUsersForCollection(id: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/collection/permissions/${+id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getPoamApproversByCollectionUser(collectionId: any, userId: any) {
        const headers = await this.getAuthHeaders();
		return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/poamApprovers/collection/${+collectionId}/user/${+userId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getPoamsByCollection(id: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/poams/collection/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async addCollectionAprover(approver: any) {
		    const headers = await this.getAuthHeaders();
		return this.http
      .post<any>(`http://localhost:8086/${this.vultrackApiBase}/collectionApprover`, approver, { headers })
      .pipe(catchError(this.handleError));
  }

  async putCollectionApprover(approver: any) {
		    const headers = await this.getAuthHeaders();
		return this.http
      .put<any>(`http://localhost:8086/${this.vultrackApiBase}/collectionApprover`, approver, { headers })
      .pipe(catchError(this.handleError));
  }
}
