import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { initialState } from './auth.reducer'

import { AuthenticationService } from './authentication.service'

describe('AuthenticationService', () => {
  let service: AuthenticationService
  let httpController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideMockStore({ initialState })],
    })

    service = TestBed.inject(AuthenticationService)
    httpController = TestBed.inject(HttpTestingController)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
