import { TestBed } from '@angular/core/testing';

import { TransportUnitsService } from './transport-units.service';

describe('TransportUnitsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransportUnitsService = TestBed.get(TransportUnitsService);
    expect(service).toBeTruthy();
  });
});
