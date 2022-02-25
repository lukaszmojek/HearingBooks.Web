import { environment } from 'src/environments/environment'

export const ApiEndpoints = {
  getAllTextSyntheses: `${environment.baseApiUrl}/text-syntheses`,
  requestTextSynthesis: `${environment.baseApiUrl}/text-syntheses`,
}
