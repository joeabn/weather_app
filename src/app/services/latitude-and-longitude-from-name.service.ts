import {Injectable} from '@angular/core';
import {ICityGeoLocation} from '../Interfaces/iCity-geoLocation';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LatitudeAndLongitudeFromNameService {
  private serviceUrl = environment.geoLocationURL;
  private serviceKey = 'd20b178108ef4b02b9f0522e1871121f';
  constructor(private http: HttpClient) {
  }

  getLongitudeAndLatitude(cityName: string): Observable<ICityGeoLocation> {
    return this.http.get<ICityGeoLocation>(this.serviceUrl, {
      params: new HttpParams().set('q', cityName).set('key', this.serviceKey)
    });
  }
}
