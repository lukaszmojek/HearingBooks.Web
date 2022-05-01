import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../../shared/api-endpoints';
import { IDialogueSynthesis, IDialogueSynthesisRequest } from './models';

@Injectable({
  providedIn: 'root'
})
export class DialogueSynthesisService {
  constructor(private http: HttpClient) { }

  getDialogueSynthesesForUser$(): Observable<IDialogueSynthesis[]> {
    return this.http.get<IDialogueSynthesis[]>(ApiEndpoints.dialogueSyntheses.getForUser)
  }

  requestDialogueSynthesis$(dialogueSyntesisRequest: IDialogueSynthesisRequest): Observable<any> {
    return this.http.post(ApiEndpoints.dialogueSyntheses.request, dialogueSyntesisRequest)
  }
}
