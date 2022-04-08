import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../shared/api-endpoints';

export interface TextSynthesisRequest {
  title: string
  textToSynthesize: string
  language: string
  voice: string
  requestingUserId: string
}

@Injectable({
  providedIn: 'root'
})
export class TextSynthesisService {

  constructor(private http: HttpClient) { }

  requestTextSynthesis$(textSyntesisRequest: TextSynthesisRequest): Observable<any> {
    return this.http.post(ApiEndpoints.textSyntheses.request, textSyntesisRequest)
  }
}
