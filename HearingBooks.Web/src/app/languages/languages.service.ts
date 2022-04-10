import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiEndpoints } from '../shared/api-endpoints'
import { ISynthesisLanguage } from './models'

@Injectable({
  providedIn: 'root',
})
export class LanguagesService {
  constructor(
    private http: HttpClient
  ) { }

  public getLanguagesWithVoices$(): Observable<ISynthesisLanguage[]> {
    return this.http.get<ISynthesisLanguage[]>(ApiEndpoints.languages.getWithVoices)
  }
}
