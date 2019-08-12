import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocomplete, MatChipInputEvent} from '@angular/material';
import {MatAutocompleteSelectedEvent} from '@angular/material/typings/esm5/autocomplete';
import {ICity} from '../../Interfaces/icity';
import {ICityWeather} from '../../Interfaces/iCityWeather';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ICityGeoLocation} from '../../Interfaces/iCity-geoLocation';
import {LatitudeAndLongitudeFromNameService} from '../../services/latitude-and-longitude-from-name.service';
import {WeatherGetterService} from '../../services/weather-getter.service';


@Component({
  selector: 'app-city-input',
  templateUrl: './city-input.component.html',
  styleUrls: ['./city-input.component.css']
})
export class CityInputComponent implements OnInit {
  specialCharacters = ['!', '#', '$', '%', '&', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~', '"'];

  constructor(private latitudeAndLongitude: LatitudeAndLongitudeFromNameService, private weatherGetter: WeatherGetterService) {

    this.filteredOptions = this.inputCityName.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.options.slice()));

  }

  selectable = true;
  removable = true;
  addOnBlur = true;
  errorMessage: string;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  cityInfo: ICityGeoLocation = {
    latitudeNumber: 0,
    longitudeNumber: 0
  };
  cityInfo2: any;
  weatherCardsResponse: any;
  inputCityName = new FormControl();
  cityWeather: ICityWeather[] = [];
  searchButtonClicked = false;
  // tslint:disable-next-line:max-line-length
  options: string[] = ['beirut', 'berlin', 'paris', 'munich', 'washington', 'florida', 'Bangkok', 'London', 'Dubai', 'Singapore', 'New York', 'Tokyo'];
  filteredOptions: Observable<string[]>;
  @ViewChild('cityInput', {static: false}) cityInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  @Input('weatherCard') weatherCard: ICity [][];
  @Input('nameOfCities') nameOfCities: string[];
  @Input('toggleChecked') toggleChecked: boolean[];
  @Output() outputToggleChecked = new EventEmitter<boolean[]>();
  @Output() outputOfWeatherCards = new EventEmitter<ICity[][]>();
  @Output() outputOfNameOfCities = new EventEmitter<string[]>();
  @Output() searchClicked = new EventEmitter<boolean>();

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen && !this.searchButtonClicked) {
      const input = event.input;
      // Add our fruit
      this.testIfInputIsGood();
      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.inputCityName.setValue(null);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const city = event.option.viewValue;
    console.log('im in the if of selected()');
    this.inputCityName.setValue(city);
    this.testIfInputIsGood();
    this.cityInput.nativeElement.value = '';
    this.inputCityName.setValue(null);
  }

  remove(cityName: string): void {
    const index = this.nameOfCities.indexOf(cityName);
    // tslint:disable-next-line:prefer-for-of
    for (let counter = 0; counter < this.weatherCard.length; counter++) {
      // tslint:disable-next-line:triple-equals
      if (this.weatherCard[counter][0].cityName == cityName) {
        this.deleteCard(this.weatherCard[counter]);
        break;
      }
    }
  }

  deleteCard(card: ICity[]) {
    const ind = this.weatherCard.indexOf(card);
    this.weatherCard.splice(ind, 1);
    this.nameOfCities.splice(ind, 1);
    this.toggleChecked.splice(ind, 1);

    console.log('i am deleting weather card of index : ' + ind);
    console.log('the array have ');
    console.log(this.weatherCard);
    console.log(this.nameOfCities);
    console.log('len of the array is ' + this.weatherCard.length);
    this.save();
  }

  clearData() {
    this.inputCityName.setValue(null);
    this.cityWeather = [];
    this.nameOfCities = [];
    this.weatherCard = [];
    this.toggleChecked = [];
    this.save();
  }

  save() {
    console.log('I\'m saving the following : ');
    console.log(this.weatherCard);
    console.log(this.nameOfCities);
    // this.globalObject = [this.nameOfTheCities, this.weatherCard, this.indexOfCards];
    localStorage.setItem('cards', JSON.stringify(this.weatherCard));
    localStorage.setItem('cities', JSON.stringify(this.nameOfCities));
    localStorage.setItem('weeklyWeatherToggle', JSON.stringify(this.toggleChecked));
    this.outputOfNameOfCities.emit(this.nameOfCities);
    this.outputOfWeatherCards.emit(this.weatherCard);
    this.outputToggleChecked.emit(this.toggleChecked);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  testIfInputIsGood() {
    this.searchButtonClicked = true;
    this.searchClicked.emit(this.searchButtonClicked);
    console.log('emited search is true');
    let isGood = true;
    if (this.inputCityName.value === null) {
      console.log('the input field is empty');
      isGood = false;

    } else if (this.nameOfCities.includes(this.inputCityName.value)) {
      console.log('the city is already shown');
      console.log(this.weatherCard);
      console.log(this.nameOfCities);
      isGood = false;
    } else {
      for (const specialCharacter of this.specialCharacters) {
        if (this.inputCityName.value.includes(specialCharacter)) {
          console.log('the input have a special character');
          isGood = false;
          break;
        }
      }
    }
    if (isGood) {
      if (this.nameOfCities.length < 8) {
        this.getGeoLocation();
      } else {
        console.log('no enough place in the page please remove some cities');
        this.searchButtonClicked = false;
        this.searchClicked.emit(this.searchButtonClicked);
        console.log('emited search is false');
      }
    } else {
      this.searchButtonClicked = false;
      this.searchClicked.emit(this.searchButtonClicked);
      console.log('emited search is false');
    }
  }

  getGeoLocation() {
    this.nameOfCities.push(this.inputCityName.value);
    this.latitudeAndLongitude.getLongitudeAndLatitude(this.inputCityName.value).subscribe((cityInfo: ICityGeoLocation) => {
        this.cityInfo2 = cityInfo;
        console.log(this.cityInfo2);
        if (typeof this.cityInfo2.results !== 'undefined' && this.cityInfo2.total_results > 0) {
          console.log('I passed the verification of the input');
          this.cityInfo.latitudeNumber = this.cityInfo2.results[0].geometry.lat;
          this.cityInfo.longitudeNumber = this.cityInfo2.results[0].geometry.lng;
          // tslint:disable-next-line:max-line-length
          console.log('city ' + this.nameOfCities[this.nameOfCities.length - 1] + ' long = ' + this.cityInfo.longitudeNumber + ' lat= ' + this.cityInfo.latitudeNumber);
          this.getWeather();
        } else {
          console.log('i catched an error of size !=0');
          this.searchButtonClicked = false;
          this.searchClicked.emit(this.searchButtonClicked);
          console.log('emited search is false');
          this.nameOfCities.splice(this.nameOfCities.length - 1);
        }
      },
      error => this.errorMessage = error as any);
    if (this.errorMessage != null) {
      this.nameOfCities.splice(this.nameOfCities.length - 1);
      // this.searchClicked.emit(false);
      console.log('emited search is false removed');
      console.log('there is an error1');
      console.log(this.errorMessage);

    }
  }

  getWeather() {
    console.log('searching for weather');
    console.log(this.cityInfo);
    this.weatherGetter.getWeather(this.cityInfo).subscribe((weatherCard) => {
        this.weatherCardsResponse = weatherCard;
        console.log(this.weatherCardsResponse);
        if (this.weatherCardsResponse.error !== null) {
          console.log('the weather of the city entered is not found! ');
          this.searchButtonClicked = false;
          this.searchClicked.emit(this.searchButtonClicked);
          console.log('emited search is false');
          this.nameOfCities.splice(this.nameOfCities.length - 1);
        } else {
          this.cityWeather = this.weatherCardsResponse.response[0].periods;
          // tslint:disable-next-line:max-line-length

          console.log('I am assigning the values');
          console.log(this.cityWeather);
          this.assignFullCity(this.nameOfCities.length - 1);
          this.searchButtonClicked = false;
          this.searchClicked.emit(this.searchButtonClicked);
          console.log('emited search is false');
          this.save();
        }
      },
      error => this.errorMessage = error as any);
    if (this.errorMessage != null) {
      console.log('there is an error ');
      this.nameOfCities.splice(this.nameOfCities.length - 1);
      console.log(this.errorMessage);
      this.nameOfCities.splice(this.nameOfCities.length - 1);
    }
  }

  assignFullCity(index: number) {
    console.log(this.cityWeather[0]);
    console.log('the time is ');
    console.log(this.cityWeather[0].validTime);
    const wc: ICity[] = [];
    for (let i = 0; i < 3; i++) {
      wc[i] = {
        cityName: this.nameOfCities[index],
        weather: this.cityWeather[i].weather,
        tempC: this.cityWeather[i].avgTempC,
        icon: '../../assets/icons/' + this.cityWeather[i].icon,
        date: this.cityWeather[i].validTime.split('T')[0]
      };
    }
    this.weatherCard.push(wc);
    console.log('I assigned ');
    console.log(wc);
  }


  ngOnInit() {
  }

}
