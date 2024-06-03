

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private vultrackApiBase = 'api';
  constructor(
    private http: HttpClient,
    private oidcSecurityService: OidcSecurityService
  ) { }

  private async getAuthHeaders() {
    const token = await firstValueFrom(this.oidcSecurityService.getAccessToken());
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  async upload(file: File, userId: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);
    const headers = await this.getAuthHeaders();
    return this.http.post(`http://localhost:8086/${this.vultrackApiBase}/import/poams`, formData, {
      headers,
      reportProgress: true,
      observe: 'events'
    });
  }
}


