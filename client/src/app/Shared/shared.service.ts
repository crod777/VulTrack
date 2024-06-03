

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';


@Injectable({ providedIn: 'root' })
export class SharedService {
  private vultrackApiBase = 'api';
  private STIGMANAGER_URL = `http://localhost:54000/api`;
  private TENNABLE_URL = "PLACEHOLDER";
  private _selectedCollection = new BehaviorSubject<any>(null);
  public readonly selectedCollection = this._selectedCollection.asObservable();
  constructor(
    private http: HttpClient,
    private oidcSecurityService: OidcSecurityService,
  ) { }

  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  private async getAuthHeaders() {
    const token = await firstValueFrom(this.oidcSecurityService.getAccessToken());
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  private async getSTIGManagerAuthHeaders() {
    const token = await firstValueFrom(this.oidcSecurityService.getAccessToken('stigman'));
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  public setSelectedCollection(collection: any) {
    this._selectedCollection.next(collection);
  }

  getApiConfig() {
    return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/op/configuration`)
      .pipe(catchError(this.handleError));
  }

  async getPoamsByVulnerabilityId(vulnerabilityId: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/vulnerability/poam/${vulnerabilityId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getExistingVulnerabilityPoams() {
        const headers = await this.getAuthHeaders();
		return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/vulnerability/existingPoams`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getSTIGsFromSTIGMAN() {
    const headers = await this.getSTIGManagerAuthHeaders();
    return this.http.get<any[]>(`${this.STIGMANAGER_URL}/stigs/`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getCollectionsFromSTIGMAN() {
    const headers = await this.getSTIGManagerAuthHeaders();
		return this.http.get<any[]>(`${this.STIGMANAGER_URL}/collections/`, { headers })
      .pipe(catchError(this.handleError));
  }

  async selectedCollectionFromSTIGMAN(collectionId: string) {
    const endpoint = `${this.STIGMANAGER_URL}/collections/${collectionId}?projection=labels`;
    const headers = await this.getSTIGManagerAuthHeaders();
		return this.http.get<any[]>(endpoint, { headers })
      .pipe(catchError(this.handleError));
  }

  async getAssetsFromSTIGMAN(collectionId: string) {
    const endpoint = `${this.STIGMANAGER_URL}/assets?collectionId=${collectionId}`;
    const headers = await this.getSTIGManagerAuthHeaders();
		return this.http.get<any[]>(endpoint, { headers })
      .pipe(catchError(this.handleError));
  }

  async getSTIGAssociatedAssets(collectionId: string, benchmarkId: string) {
    const url = `${this.STIGMANAGER_URL}/collections/${collectionId}/stigs/${benchmarkId}/assets`;
    const headers = await this.getSTIGManagerAuthHeaders();
		return this.http.get<any[]>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  async getAffectedAssetsFromSTIGMAN(collectionId: string) {
    const url = `${this.STIGMANAGER_URL}/collections/${collectionId}/findings?aggregator=groupId&acceptedOnly=false&projection=assets&projection=stigs&projection=rules`;
    const headers = await this.getSTIGManagerAuthHeaders();
		return this.http.get<any[]>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  async getRuleDataFromSTIGMAN(ruleId: string) {
    const url = `${this.STIGMANAGER_URL}/stigs/rules/${ruleId}?projection=detail&projection=check&projection=fix`;
    const headers = await this.getSTIGManagerAuthHeaders();
		return this.http.get<any[]>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  async selectedAssetsFromSTIGMAN(assetId: string) {
    const endpoint = `${this.STIGMANAGER_URL}/assets/${assetId}`;
    const headers = await this.getSTIGManagerAuthHeaders();
		return this.http.get<any>(endpoint, { headers })
      .pipe(catchError(this.handleError));
  }

  getTenableScanResults(scanId: string, fields?: string) {
    const tenableAccessKey = "This will be removed and handled securely";
    const tenableSecretKey = "This will be removed and handled securely";
    const endpoint = `${this.TENNABLE_URL}/scanResult/${scanId}`;
    const url = fields ? `${endpoint}?fields=${fields}` : endpoint;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-ApiKeys': `accessKey=${tenableAccessKey}; secretKey=${tenableSecretKey}`
    });

		return this.http.get(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getTenableScans(fields?: string) {
    const tenableAccessKey = "This will be removed and handled securely";
    const tenableSecretKey = "This will be removed and handled securely";
    const endpoint = `${this.TENNABLE_URL}/scanResult`;
    const url = fields ? `${endpoint}?fields=${fields}` : endpoint;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-ApiKeys': `accessKey=${tenableAccessKey}; secretKey=${tenableSecretKey}`
    });

		return this.http.get(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }
}
