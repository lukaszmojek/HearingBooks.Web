import * as jwt from 'jwt-decode'

export interface DecodedToken extends jwt.JwtPayload {
  id: string
  type: number
  name: string
}
