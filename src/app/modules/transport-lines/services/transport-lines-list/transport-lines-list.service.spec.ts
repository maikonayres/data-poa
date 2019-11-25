import { TestBed } from '@angular/core/testing';

import { TransportLinesListService } from './transport-lines-list.service';

describe('BusLineListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransportLinesListService = TestBed.get(TransportLinesListService);
    expect(service).toBeTruthy();
  });
});
