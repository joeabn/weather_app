import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ICityWeather} from '../Interfaces/iCityWeather';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ICityGeoLocation} from '../Interfaces/iCity-geoLocation';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherGetterService {
  // tslint:disable-next-line:max-line-length

  url = environment.weatherURL;
  clientId = 'j9aMxFcCV7KwIQoFtAYHx';
  clientSecret = 'JCRM3KkNGtnDxug3CYyikrbWvhaNE5QLS5AZaX68';

  // tslint:disable-next-line:max-line-length
  // url= 'http://api.aerisapi.com/observations/closest?fields=ob.tempC,ob.weather,ob.icon&p=38.8951,-77.0364&limit=5&client_id=j9aMxFcCV7KwIQoFtAYHx&client_secret=JCRM3KkNGtnDxug3CYyikrbWvhaNE5QLS5AZaX68'
  constructor(private http: HttpClient) {
  }

  getWeather(cityInfo: ICityGeoLocation): Observable<ICityWeather[]> {
    // tslint:disable-next-line:no-unused-expression
    console.log((this.url
        , {
        // tslint:disable-next-line:max-line-length
        params: new HttpParams().set('p', String(cityInfo.latitudeNumber + ',' + cityInfo.longitudeNumber)).set('client_id', this.clientId).set('client_secret', this.clientSecret)
      }
    ));
    return this.http.get<ICityWeather[]>(this.url
      , {
        // tslint:disable-next-line:max-line-length
        params: new HttpParams().set('p', String(cityInfo.latitudeNumber + ',' + cityInfo.longitudeNumber)).set('client_id', this.clientId).set('client_secret', this.clientSecret)
      });
  }
}
