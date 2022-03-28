import * as jwt from 'jwt-decode'

export interface DecodedToken extends jwt.JwtPayload {
  id: number
  type: number
  name: string
}