import { TestBed } from '@angular/core/testing';

import { SnackbarNotificationsService } from './snackbar-notifications.service';

describe('SnackbarNotificationsService', () => {
  let service: SnackbarNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackbarNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
