import { Component, inject, Input, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './weather.service';
import { WeatherInfo } from '../models/weather-info';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
  route = inject(ActivatedRoute);
  location = inject(Location);
  @Input()
  set zip(id: string | undefined) {
    const queryParams = this.route.snapshot.queryParamMap;
    const zip = queryParams.get('zip');
    if (zip) {
      this.zipCode = parseInt(zip);
      this.update(this.zipCode);
    } else {
      this.zipCode = id ? parseInt(id) : 90210;
      this.update(this.zipCode);
    }
  }

  onSubmit() {
    this.location.go(`/${this.enteredZip}`);    
    this.enteredZip = '';
  }

  async update(zipCode: number | undefined) {
    if (!zipCode) return;
    this.weatherInfo.set(await this.weatherService.getWeather(zipCode));
  }
}
