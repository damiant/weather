import { Component, inject, OnInit, signal } from '@angular/core';
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
export class AppComponent implements OnInit {
  weatherService = inject(WeatherService);
  weatherInfo = signal<WeatherInfo>({ title: '', days: [] });

  async ngOnInit() {
    this.weatherInfo.set(await this.weatherService.getWeather('94040'));
  }
}
