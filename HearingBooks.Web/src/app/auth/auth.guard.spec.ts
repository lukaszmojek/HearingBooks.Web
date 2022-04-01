import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore } from '@ngrx/store/testing'

import { AuthGuard } from './auth.guard'
import { initialState } from './auth.reducer'

describe('AuthGuard', () => {
  let guard: AuthGuard

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [provideMockStore({ initialState })],
    })
    guard = TestBed.inject(AuthGuard)
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })
})
