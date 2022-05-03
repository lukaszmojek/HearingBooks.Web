import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../../shared/api-endpoints';
import { ISynthesesSummary } from './models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) { }

  getSynthesesSummaryForUser$(userId: string): Observable<ISynthesesSummary> {
    return this.http.get<ISynthesesSummary>(ApiEndpoints.dashboard.synthesesSummary(userId))
  }
}
