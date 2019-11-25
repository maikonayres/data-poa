import { TestBed } from '@angular/core/testing';

import { ErrorsNotifyService } from './errors-notify.service';

describe('ErrorNotifyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorsNotifyService = TestBed.get(ErrorsNotifyService);
    expect(service).toBeTruthy();
  });
});
