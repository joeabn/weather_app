import {Component, OnInit} from '@angular/core';
import {WeatherGetterService} from './services/weather-getter.service';
import {LatitudeAndLongitudeFromNameService} from './services/latitude-and-longitude-from-name.service';
import {ICity} from './Interfaces/icity';
import {ICityWeather} from './Interfaces/iCityWeather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WeatherGetterService, LatitudeAndLongitudeFromNameService]
})

export class AppComponent implements OnInit {
  title = 'weatherApp';
  weatherCard: ICity[][] = [];
  nameOfCities: string[] = [];
  cityWeather: ICityWeather[] = [];
  toggleChecked: boolean[] = [];
  searchClicked = false;

  ngOnInit(): void {
    console.log('HELLLo ');
    this.weatherCard = JSON.parse(localStorage.getItem('cards'));
    this.nameOfCities = JSON.parse(localStorage.getItem('cities'));
    this.cityWeather = JSON.parse(localStorage.getItem('weather'));
    this.toggleChecked = JSON.parse(localStorage.getItem('weeklyWeatherToggle'));
    // console.log(this.globalObject[0]);
    console.log(this.weatherCard);
    console.log(this.toggleChecked);
  }


}
