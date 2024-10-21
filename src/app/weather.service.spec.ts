import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import forecasts from '../../sample-data.json'
import { DaysWeather } from '../models/weather-info';

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should convert data', () => {
    const expected: DaysWeather =
    {
      "day": "Monday", "forecasts": [
        { "time": "6pm", "temperature": 66, "description": "Few Clouds" },
        { "time": "9pm", "temperature": 70, "description": "Few Clouds" }
      ]
    };

    expect(service.mapForecasts(forecasts)[0]).toEqual(expected);
  });
});
