import { TestBed } from '@angular/core/testing';

import { WeatherGetterService } from './weather-getter.service';

describe('WeatherGetterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherGetterService = TestBed.get(WeatherGetterService);
    expect(service).toBeTruthy();
  });
});
