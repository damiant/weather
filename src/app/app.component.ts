import { Component, inject, Input, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './weather.service';
import { WeatherInfo } from '../models/weather-info';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  weatherService = inject(WeatherService);
  weatherInfo = signal<WeatherInfo>({ title: '', days: [] });
  zipCode: number | undefined;
  @Input()
  set zip(id: string) {
    this.zipCode = parseInt(id);
    this.update(this.zipCode);
  }


  async update(zipCode: number | undefined) {
    if (!zipCode) return;
    this.weatherInfo.set(await this.weatherService.getWeather(zipCode));
  }
}
