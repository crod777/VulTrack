

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { firstValueFrom, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CollectionsResponse } from './user/user.component';
import { Users } from './users.model';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  @Output() resetRole: EventEmitter<any> = new EventEmitter();
  private vultrackApiBase = 'api';

  constructor(
    private http: HttpClient,
    private oidcSecurityService: OidcSecurityService
  ) {
  }

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


  async loginState(state: string) {
    const loginState = { loginState: state };
    const headers = await this.getAuthHeaders();
    return this.http
      .put<any>(`http://localhost:8086/${this.vultrackApiBase}/user/loginState`, loginState, { headers })
      .pipe(catchError(this.handleError));
  }

  async getUser(id: any) {
    const headers = await this.getAuthHeaders();
		return this.http
      .get(`http://localhost:8086/${this.vultrackApiBase}/user/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getCurrentUser() {
    const headers = await this.getAuthHeaders();
    console.log(headers);
		return this.http.get<Users>(`http://localhost:8086/${this.vultrackApiBase}/user`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getUsers() {
        const headers = await this.getAuthHeaders();
		return this.http
      .get<any>(`http://localhost:8086/${this.vultrackApiBase}/users`, { headers })
      .pipe(catchError(this.handleError));
  }

  async deletePermission(userId: any, collectionId: any) {
        const headers = await this.getAuthHeaders();
		return this.http
      .delete<any>(`http://localhost:8086/${this.vultrackApiBase}/permission/${userId}/${collectionId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async postPermission(userPermission: any) {
        const headers = await this.getAuthHeaders();
		return this.http
      .post<any>(`http://localhost:8086/${this.vultrackApiBase}/permission`, userPermission, { headers })
      .pipe(catchError(this.handleError));
  }

  async updatePermission(userPermission: any) {
        const headers = await this.getAuthHeaders();
		return this.http
      .put<any>(`http://localhost:8086/${this.vultrackApiBase}/permission`, userPermission, { headers })
      .pipe(catchError(this.handleError));
  }

  async getBasicUserByUserId(userId: any) {
        const headers = await this.getAuthHeaders();
		return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/user/basic/${userId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async updateUser(userData: any) {
        const headers = await this.getAuthHeaders();
		return this.http
      .put<Users>(`http://localhost:8086/${this.vultrackApiBase}/user`, userData, { headers })
      .pipe(catchError(this.handleError));
  }

  async getCollection(collectionId: any, userName: string) {
        const headers = await this.getAuthHeaders();
		return this.http
      .get<any>(`http://localhost:8086/${this.vultrackApiBase}/collection/${collectionId}/user/${userName}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getCollections(userName: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get<CollectionsResponse>(`http://localhost:8086/${this.vultrackApiBase}/collections/${userName}`, { headers })
      .pipe(catchError(this.handleError));
  }

  changeRole(payload: any) {
    this.resetRole.emit(payload);
  }
}
