import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as saveAs from 'file-saver';
import { ApiEndpoints } from '../shared/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  downloadTextSynthesis$(synthesisId: string, filename: string): void {
    const downloadUrl = ApiEndpoints.textSyntheses.download(synthesisId)
    this.downloadFile(downloadUrl, filename)
  }

  downloadDialogueSynthesis$(synthesisId: string, filename: string): void {
    const downloadUrl = ApiEndpoints.dialogueSyntheses.download(synthesisId)
    this.downloadFile(downloadUrl, filename)
  }

  private downloadFile(downloadUrl: string, filename: string): void {
    this.http.get(downloadUrl, { responseType: "blob" }).subscribe(x => {
      saveAs(x, filename)
    })
  }
}
