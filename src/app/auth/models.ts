export interface IApiResponse<T> {
  succeded: boolean
  error: string
  content: T
}

export interface ITokenResponse {
  username: string
  token: string
}
