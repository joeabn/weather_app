import { TestBed } from '@angular/core/testing';

import { LatitudeAndLongitudeFromNameService } from './latitude-and-longitude-from-name.service';

describe('LatitudeAndLongitudeFromNameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LatitudeAndLongitudeFromNameService = TestBed.get(LatitudeAndLongitudeFromNameService);
    expect(service).toBeTruthy();
  });
});
