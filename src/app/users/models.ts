export class User { }

export enum UserType {
  PayAsYouGo = 0,
  Subscriber = 1,
  Writer = 2,
  HearingBooks = 3,
}

export type UserActionDto = RegisterUserDto | ChangeUserDetailsDto

export enum UserActionType {
  Register,
  ChangeDetails
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  type: UserType
}

export interface RegisterUserDto {
  firstName: string
  lastName: string
  email: string
  type: number
  password: string
}
export interface ChangeUserDetailsDto {
  id: string
  firstName: string
  lastName: string
  email: string
  type: number
}

export interface ChangePasswordDto {
  userId: string,
  oldPassword: string,
  newPassword: string
}