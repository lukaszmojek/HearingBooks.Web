import { environment } from 'src/environments/environment'

export const ApiEndpoints = {
  auth: {
    login: `${environment.baseApiUrl}/auth/login`,
  },
  dashboard: {
    synthesesSummary: (userId: string) => `${environment.baseApiUrl}/syntheses-summary/${userId}`,
  },
  dialogueSyntheses: {
    getAll: `${environment.baseApiUrl}/dialogue-syntheses`,
    getForUser: `${environment.baseApiUrl}/dialogue-syntheses`,
    request: `${environment.baseApiUrl}/dialogue-syntheses`,
    download: (synthesisId: string) => `${environment.baseApiUrl}/dialogue-syntheses/${synthesisId}`,
  },
  textSyntheses: {
    getAll: `${environment.baseApiUrl}/text-syntheses`,
    getForUser: `${environment.baseApiUrl}/text-syntheses`,
    request: `${environment.baseApiUrl}/text-syntheses`,
    download: (synthesisId: string) => `${environment.baseApiUrl}/text-syntheses/${synthesisId}`,
  },
  languages: {
    getWithVoices: `${environment.baseApiUrl}/languages`,
  }
}
