import { Component, inject, Input, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { WeatherService } from './weather.service';
import { WeatherInfo } from '../models/weather-info';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  weatherService = inject(WeatherService);
  weatherInfo = signal<WeatherInfo>({ title: '', days: [] });
  zipCode: number | undefined;
  enteredZip: string | undefined;
  router = inject(Router);
  @Input()
  set zip(id: string | undefined) {
    this.zipCode = id ? parseInt(id) : 90210;
    this.update(this.zipCode);
  }


  onSubmit() {
    this.router.navigateByUrl(`/${this.enteredZip}`,{ replaceUrl: true });
    this.enteredZip = '';
  }

  async update(zipCode: number | undefined) {
    if (!zipCode) return;
    this.weatherInfo.set(await this.weatherService.getWeather(zipCode));
  }
}
