import { Injectable } from '@angular/core';
import { DaysWeather, WeatherInfo } from '../models/weather-info';
import { Location } from '../models/location';
import { WeatherResponse } from '../models/weather-response';
import { ForecastResponse } from '../models/forecast-response';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = `d2aee13bbfaa348b319c282b272d9098`;

  constructor() { }

  public async getWeather(zip: number): Promise<WeatherInfo> {
    const location = await this.getLocationForZip(zip, 'US');
    const forecast = await this.getForecast(location);    
    return {
      title: location.city,
      days: this.mapForecasts(forecast)
    };
  }

  mapForecasts(forecast: ForecastResponse): DaysWeather[] {
    const items = forecast.list.filter(item => item.weather.length > 0);
    const result: DaysWeather[] = [];
    let currentDay = '';
    for (const item of items) {
      const day = this.getDayName(item.dt_txt)
      if (day !== currentDay) {
        currentDay = day;
        result.push({ day, forecasts: [] });
      }
      result[result.length - 1].forecasts.push({
        time: this.getFormattedLocalTime(item.dt_txt),
        temperature: Math.round(item.main.temp),
        icon: item.weather[0].icon,
        description: this.toTitleCase(item.weather[0].description)
      });
    }
    return result;
  }

  private getDayName(dt_txt: string): string {
    const date = new Date(dt_txt+'Z');
    return date.toLocaleString('default', { weekday: 'long' });
  }

  private getFormattedLocalTime(date: string) {
    return new Date(date+'Z').toLocaleString('default', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase().replace(':00', '').replace(' ', '');
  }

  private async getForecast(location: Location): Promise<ForecastResponse> {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=imperial&appid=${this.apiKey}`;
    const res: Response = await fetch(url);
    return await res.json();
  }

  private async getLocationForZip(zip: number, countryCode: string): Promise<Location> {
    const url = new URL(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},${countryCode}&appid=${this.apiKey}`);
    try {
      const res: Response = await fetch(url);
      const data: WeatherResponse = await res.json();
      return {
        city: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon
      };
    } catch (err) {
      console.error(`Unable to find zip code ${zip}`, err);
      return {
        city: 'Unknown',
        lat: 0,
        lon: 0
      }
    }
  }

  private toTitleCase(str: string) {
    return str.toLowerCase().split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }
}
