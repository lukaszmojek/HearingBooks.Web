import { environment } from 'src/environments/environment'

export const ApiEndpoints = {
  auth: {
    login: `${environment.baseApiUrl}/login`,
  },
  textSyntheses: {
    getAll: `${environment.baseApiUrl}/text-syntheses`,
    request: `${environment.baseApiUrl}/text-syntheses`,
  }
}
