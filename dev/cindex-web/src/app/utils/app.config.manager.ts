import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Country } from "../models/country.model";
import { City } from "../models/city.model";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppConfigManager {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  countryConfigUrl = `${environment.production?'configs/prod/':'configs/dev/'}country.json`;
  cityConfigUrl = `${environment.production?'configs/prod/':'configs/dev/'}city/`;

  constructor(private http: HttpClient) {
    console.log("URL:"+this.countryConfigUrl)
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.countryConfigUrl);
  }

  getCities(countryCode: string): Observable<City[]> {
    console.log(countryCode);
    return this.http.get<City[]>(this.cityConfigUrl + countryCode+'.json');
  }
}
