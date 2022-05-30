import * as jwt from 'jwt-decode'

export interface DecodedToken extends jwt.JwtPayload {
  id: string
  type: number
  firstName: string
  lastName: string
  email: string
}
