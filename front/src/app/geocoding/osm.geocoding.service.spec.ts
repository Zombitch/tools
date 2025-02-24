import { TestBed } from '@angular/core/testing';

import { OsmGeocodingService } from './osm.geocoding.service';

describe('OsmGeocodingService', () => {
  let service: OsmGeocodingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OsmGeocodingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
