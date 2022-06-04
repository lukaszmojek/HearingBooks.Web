import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from 'src/app/shared/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class TopUpService {

  constructor(private http: HttpClient) { }

  topUp$(amount: number): Observable<any> {
    return this.http.post(ApiEndpoints.users.topUp, { amount: amount })
  }
}
