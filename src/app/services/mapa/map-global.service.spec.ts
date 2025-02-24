import { TestBed } from '@angular/core/testing';

import { MapGlobalService } from './map-global.service';

describe('MapGlobalService', () => {
  let service: MapGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
