import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../shared/api-endpoints';
import { ITextSynthesis, ITextSynthesisRequest } from './state/models';

@Injectable({
  providedIn: 'root'
})
export class TextSynthesisService {

  constructor(private http: HttpClient) { }

  getTextSynthesesForUser$(): Observable<ITextSynthesis[]> {
    return this.http.get<ITextSynthesis[]>(ApiEndpoints.textSyntheses.getForUser)
  }

  requestTextSynthesis$(textSyntesisRequest: ITextSynthesisRequest): Observable<any> {
    return this.http.post(ApiEndpoints.textSyntheses.request, textSyntesisRequest)
  }
}
