import * as jwt from 'jwt-decode'

export interface DecodedToken extends jwt.JwtPayload {
  id: number
  role: string
  name: string
}
