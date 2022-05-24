import { TestBed } from '@angular/core/testing'

import { AcrylicService } from './acrylic.service'

describe('AcrylicService', () => {
  let service: AcrylicService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(AcrylicService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
