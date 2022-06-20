import { UserType } from "../shared/users/models"

export interface IApiResponse<T> {
  succeded: boolean
  error: string
  content: T
}

export interface ITokenResponse {
  username: string
  token: string
}

export interface IUser {
  type: UserType
  firstName: string
  lastName: string
  isActive: boolean
  userName: string
  email: string
  password: string
  balance: number
  preferenceDto: IPreference
}

export interface IPreference {
  acrylicEnabled: string
  language: string
  emailNotificationsEnabled: string
}