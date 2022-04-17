import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as saveAs from 'file-saver';
import { ApiEndpoints } from '../shared/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  downloadTextSynthesis$(synthesisId: string): void {
    this.http.get(ApiEndpoints.textSyntheses.download(synthesisId), { responseType: "blob" }).subscribe(x => {
      saveAs(x, 'sample.wav');
    })
  }
}
