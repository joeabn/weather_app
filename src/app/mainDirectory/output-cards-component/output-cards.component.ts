import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ICityWeather} from '../../Interfaces/iCityWeather';
import {ICity} from '../../Interfaces/icity';
import {Input} from '@angular/core';

@Component({
  selector: 'app-output-cards',
  templateUrl: './output-cards.component.html',
  styleUrls: ['./output-cards.component.css'],
})

export class OutputCardsComponent implements OnInit {
  cityWeather: ICityWeather[] = [];
  @Input('searchClicked') searchClicked: boolean;
  @Input('weatherCard') weatherCard: ICity [][];
  @Input('nameOfCities') nameOfCities: string[];
  @Input('toggleChecked') toggleChecked: boolean[];
  @Output() outputToggleChecked = new EventEmitter<boolean[]>();
  @Output() outputOfWeatherCards = new EventEmitter<ICity[][]>();
  @Output() outputOfNameOfCities = new EventEmitter<string[]>();

  constructor() {
  }

  save() {
    console.log('I\'m saving the following : ');
    console.log(this.weatherCard);
    console.log(this.nameOfCities);
    console.log(this.cityWeather);
    console.log(this.toggleChecked);
    this.outputToggleChecked.emit(this.toggleChecked);
    this.outputOfNameOfCities.emit(this.nameOfCities);
    this.outputOfWeatherCards.emit(this.weatherCard);
    // this.globalObject = [this.nameOfTheCities, this.weatherCard, this.indexOfCards];
    localStorage.setItem('cards', JSON.stringify(this.weatherCard));
    localStorage.setItem('cities', JSON.stringify(this.nameOfCities));
    localStorage.setItem('weather', JSON.stringify(this.cityWeather));
    localStorage.setItem('weeklyWeatherToggle', JSON.stringify(this.toggleChecked));
  }

  deleteCard(card: ICity[]) {
    const ind = this.weatherCard.indexOf(card);
    this.weatherCard.splice(ind, 1);
    // this.cityWeather.splice(ind, 1);
    this.nameOfCities.splice(ind, 1);
    this.toggleChecked.splice(ind, 1);

    console.log('i am deleting weather card of index : ' + ind);
    console.log('the array have ');
    console.log(this.weatherCard);
    console.log(this.nameOfCities);
    console.log('len of the array is ' + this.weatherCard.length);
    this.save();
  }

  ngOnInit(): void {
    console.log('search clicked is' + this.searchClicked);
  }

}
