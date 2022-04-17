import { environment } from 'src/environments/environment'

export const ApiEndpoints = {
  auth: {
    login: `${environment.baseApiUrl}/auth/login`,
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
