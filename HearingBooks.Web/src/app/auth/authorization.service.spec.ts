import { TestBed } from '@angular/core/testing'
import { AuthorizationService } from './authorization.service'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { IAuthState } from './auth.reducer'
import { IApplicationState } from '../core/state'
import { UserType } from '../core/users/models'

fdescribe('AuthorizationService', () => {
  let service: AuthorizationService
  let store: MockStore

  const exampleToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoixYF1a2FzeiIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwibmJmIjoxNjQyMjY5MzUyLCJleHAiOjE2NDIyNzI5NTIsImlhdCI6MTY0MjI2OTM1Mn0.dtzaApSQnWQMZKUFhTxf5O9IWtGVKSoIatiyVQvwBaE"

  const initialState: IApplicationState = { 
    auth: {token: exampleToken} as IAuthState
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState })
      ]
    })

    service = TestBed.inject(AuthorizationService)
    store = TestBed.inject(MockStore)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('rawToken', () => {
    it('should return 1', () => {
      expect(service.rawToken).toEqual(exampleToken)
    })
  })

  describe('isAuthorized', () => {
    it('should return true', () => {
      expect(service.isAuthorized).toBeTrue()
    })
  })

  describe('currentUserId', () => {
    it('should return 1', () => {
      expect(parseInt(`${service.currentUserId()}`)).toEqual(1)
    })
  })

  describe('currentUserName', () => {
    it('should return Łukasz', () => {
      expect(service.currentUserName()).toEqual('Łukasz')
    })
  })

  describe('role', () => {
    it('should return Administrator role', () => {
      expect(service.type()).toEqual(UserType.HearingBooks)
    })
  })

  describe('isAdministrator', () => {
    it('should return true', () => {
      expect(service.isAdministrator()).toBeTrue()
    })
  })
})
