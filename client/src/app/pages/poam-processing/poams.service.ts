

import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root'
})
export class PoamService {
  private vultrackApiBase = 'api';

  constructor(
    private http: HttpClient,
    private oidcSecurityService: OidcSecurityService
  ) { }

  public onNewPoam = new EventEmitter<any>();

  public newPoam(poam: any) {
    this.onNewPoam.emit({ poam });
  }

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

  async getCollection(id: string, userName: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/collection/${id}/user/${userName}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getCollectionPoamStatus(id: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/metrics/collection/${id}/poamstatus`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getCollectionPoamLabel(id: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/metrics/collection/${id}/poamlabel`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getCollectionPoamSeverity(id: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/metrics/collection/${id}/poamseverity`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getCollectionPoamScheduledCompletion(id: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/metrics/collection/${id}/poamScheduledCompletion`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getCollectionMonthlyPoamStatus(collectionId: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/metrics/collection/${collectionId}/monthlypoamstatus`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getPoam(id: string, includeApprovers: boolean = false, includeAssignees: boolean = false, includeAssets: boolean = false) {
    const params = new HttpParams()
      .set('approvers', includeApprovers.toString())
      .set('assignees', includeAssignees.toString())
      .set('assets', includeAssets.toString());

        const headers = await this.getAuthHeaders();
		return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/poam/${id}`, {
      headers: headers,
      params: params
    }).pipe(catchError(this.handleError));
  }

  async getPoamsByCollection(id: string, includeApprovers: boolean = false, includeAssignees: boolean = false, includeAssets: boolean = false) {
    const params = new HttpParams()
      .set('approvers', includeApprovers.toString())
      .set('assignees', includeAssignees.toString())
      .set('assets', includeAssets.toString());

        const headers = await this.getAuthHeaders();
		return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/poams/collection/${id}`, {
      headers: headers,
      params: params
    }).pipe(catchError(this.handleError));
  }

  async getPoamsBySubmitter(submitterId: string, includeApprovers: boolean = false, includeAssignees: boolean = false, includeAssets: boolean = false) {
    const params = new HttpParams()
      .set('approvers', includeApprovers.toString())
      .set('assignees', includeAssignees.toString())
      .set('assets', includeAssets.toString());

        const headers = await this.getAuthHeaders();
		return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/poams/submitter/${submitterId}`, {
      headers: headers,
      params: params
    }).pipe(catchError(this.handleError));
  }

  async getAssetsForCollection(collectionId: number) {
        const headers = await this.getAuthHeaders();
		return this.http
      .get<any>(`http://localhost:8086/${this.vultrackApiBase}/assets/collection/${collectionId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getPoamAssets(id: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/poamAssets/poam/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getPoamAssignees(id: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/poamAssignees/poam/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }


  async postPoam(poam: any) {
        const headers = await this.getAuthHeaders();
		return this.http
      .post<any>(`http://localhost:8086/${this.vultrackApiBase}/poam`, poam, { headers })
      .pipe(catchError(this.handleError));
  }

  async updatePoam(poam: any) {
        const headers = await this.getAuthHeaders();
		return this.http
      .put<any>(`http://localhost:8086/${this.vultrackApiBase}/poam`, poam, { headers })
      .pipe(catchError(this.handleError));
  }

  async updatePoamStatus(poamId: any, poamStatusUpdate: any) {
        const headers = await this.getAuthHeaders();
		return this.http
      .put<any>(`http://localhost:8086/${this.vultrackApiBase}/poam/status/${poamId}`, poamStatusUpdate, { headers })
      .pipe(catchError(this.handleError));
  }

  async postPoamAssignee(poamAssignee: any) {
        const headers = await this.getAuthHeaders();
		return this.http
      .post<any>(`http://localhost:8086/${this.vultrackApiBase}/poamAssignee`, poamAssignee, { headers })
      .pipe(catchError(this.handleError));
  }

  async deletePoamAssignee(poamId: any, userId: any, requestorId: any) {
    const requestBody = { requestorId: requestorId };
    const headers = await this.getAuthHeaders();
    const options = {
      ...{ headers: headers },
      body: requestBody
    };

		return this.http.delete<any>(`http://localhost:8086/${this.vultrackApiBase}/poamAssignee/poam/${poamId}/user/${userId}`, options);
  }

  async postPoamAsset(poamAsset: any) {
        const headers = await this.getAuthHeaders();
		return this.http
      .post<any>(`http://localhost:8086/${this.vultrackApiBase}/poamAsset`, poamAsset, { headers })
      .pipe(catchError(this.handleError));
  }

  async deletePoamAsset(poamId: any, assetId: any, requestorId: any) {
    const requestBody = { requestorId: requestorId };
    const headers = await this.getAuthHeaders();
    const options = {
      ...{ headers: headers },
      body: requestBody
    };
		return this.http.delete<any>(`http://localhost:8086/${this.vultrackApiBase}/poamAsset/poam/${poamId}/asset/${assetId}`, options);
  }

  async deletePoamAssetByPoamId(poamId: any) {
        const headers = await this.getAuthHeaders();
		return this.http
      .delete<any>(`http://localhost:8086/${this.vultrackApiBase}/poamAssets/poam/${poamId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getPoamApprovers(id: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get<any>(`http://localhost:8086/${this.vultrackApiBase}/poamApprovers/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getPoamApproversByCollectionUser(collectionId: string, userId: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get<any>(`http://localhost:8086/${this.vultrackApiBase}/poamApprovers/collection/${collectionId}/${userId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getPoamApproversByUserId(userId: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get<any>(`http://localhost:8086/${this.vultrackApiBase}/poamApprovers/user/${userId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async addPoamApprover(approver: any) {
        const headers = await this.getAuthHeaders();
		return this.http
      .post<any>(`http://localhost:8086/${this.vultrackApiBase}/poamApprover`, approver, { headers })
      .pipe(catchError(this.handleError));
  }

  async updatePoamApprover(approver: any) {
        const headers = await this.getAuthHeaders();
		return this.http
      .put<any>(`http://localhost:8086/${this.vultrackApiBase}/poamApprover`, approver, { headers })
      .pipe(catchError(this.handleError));
  }

  async deletePoamApprover(poamId: any, userId: any, requestorId: any) {
    const requestBody = { requestorId: requestorId };
    const headers = await this.getAuthHeaders();
    const options = {
      ...{ headers: headers },
      body: requestBody
    };
		return this.http.delete<any>(`http://localhost:8086/${this.vultrackApiBase}/poamApprover/poam/${poamId}/user/${userId}`, options);
  }

  async getPoamMilestones(poamId: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get<any>(`http://localhost:8086/${this.vultrackApiBase}/poamMilestones/${poamId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async addPoamMilestone(poamId: string, milestone: any) {
        const headers = await this.getAuthHeaders();
		return this.http
      .post<any>(`http://localhost:8086/${this.vultrackApiBase}/poamMilestones/${poamId}`, milestone, { headers })
      .pipe(catchError(this.handleError));
  }

  async updatePoamMilestone(poamId: string, milestoneId: string, milestone: any) {
        const headers = await this.getAuthHeaders();
		return this.http
      .put<any>(`http://localhost:8086/${this.vultrackApiBase}/poamMilestones/${poamId}/${milestoneId}`, milestone, { headers })
      .pipe(catchError(this.handleError));
  }

  async deletePoamMilestone(poamId: string, milestoneId: string, requestorId: any, extension: boolean) {
    const requestBody = { requestorId: requestorId, extension: extension };
    const headers = await this.getAuthHeaders();
    const options = {
      ...{ headers: headers },
      body: requestBody
    };
		return this.http.delete<any>(`http://localhost:8086/${this.vultrackApiBase}/poamMilestones/${poamId}/${milestoneId}`, options);
  }

  async getLabels(collectionId: string) {
        const headers = await this.getAuthHeaders();
		return this.http
      .get(`http://localhost:8086/${this.vultrackApiBase}/labels/${collectionId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async postLabel(collectionId: string, label: any) {
        const headers = await this.getAuthHeaders();
		return this.http
      .post<any>(`http://localhost:8086/${this.vultrackApiBase}/label/${collectionId}`, label, { headers })
      .pipe(catchError(this.handleError));
  }

  async getPoamLabels(id: any) {
        const headers = await this.getAuthHeaders();
		return this.http
      .get(`http://localhost:8086/${this.vultrackApiBase}/poamLabels/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getPoamLabelsByPoam(id: any) {
        const headers = await this.getAuthHeaders();
		return this.http
      .get(`http://localhost:8086/${this.vultrackApiBase}/poamLabels/poam/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async postPoamLabel(poamLabel: any) {
        const headers = await this.getAuthHeaders();
		return this.http
      .post<any>(`http://localhost:8086/${this.vultrackApiBase}/poamLabel`, poamLabel, { headers })
      .pipe(catchError(this.handleError));
  }

  async deletePoamLabel(poamId: any, labelId: any, requestorId: any) {
    const requestBody = { requestorId: requestorId };
    const headers = await this.getAuthHeaders();
    const options = {
      ...{ headers: headers },
      body: requestBody
    };
		return this.http.delete<any>(`http://localhost:8086/${this.vultrackApiBase}/poamLabel/poam/${poamId}/label/${labelId}`, options);
  }

  async getAvailablePoamStatus(userId: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/metrics/available/${userId}/poamstatus`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getAvailablePoamLabel(userId: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/metrics/available/${userId}/poamlabel`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getAvailablePoamSeverity(userId: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/metrics/available/${userId}/poamseverity`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getAvailableMonthlyPoamStatus(userId: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/metrics/available/${userId}/monthlypoamstatus`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getAvailablePoamScheduledCompletion(userId: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/metrics/available/${userId}/poamScheduledCompletion`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getAvailableCollectionPoamCounts(userId: any) {
        const headers = await this.getAuthHeaders();
		return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/metrics/available/${userId}/collectionpoamcount`, { headers })
      .pipe(catchError(this.handleError));
  }


  async getAvailablePoams(userId: string) {
        const headers = await this.getAuthHeaders();
		return this.http.get(`http://localhost:8086/${this.vultrackApiBase}/poams/${userId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async getAvailablePoamLabels(userId: any) {
        const headers = await this.getAuthHeaders();
		return this.http
      .get(`http://localhost:8086/${this.vultrackApiBase}/poamLabels/available/${userId}`, { headers })
      .pipe(catchError(this.handleError));
  }
}
