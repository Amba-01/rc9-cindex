import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from 'src/app/models/city.model';
import { Country } from 'src/app/models/country.model';
import { AppConfigManager } from 'src/app/utils/app.config.manager';

import { User } from '../../models/user.model';
import { UserFacade } from '../../facades/user.facade'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users$: Observable<User[]>;

  selectedUser: User;
  countries: Country[];
  cities: City[];

  constructor(
    private appConfigManager: AppConfigManager,
    private userFacade: UserFacade
  ) {}

  ngOnInit() {
    this.users$ = this.userFacade.users$;

    this.userFacade.loadAll(10, 1);

    this.appConfigManager.getCountries().subscribe(
      (data) => (this.countries = data),
      (error) => {
        throw error;
      },
      () => console.log("---%%%%%-->" + JSON.stringify(this.countries.length))
    );
  }

  onCountrySelected(countryCode) {
    this.appConfigManager.getCities(countryCode).subscribe(
      (data) => (this.cities = data),
      (error) => console.log(error),
      () => console.log("---$$$$$----->1" + JSON.stringify(this.cities))
    );
  }

  public onUserEmitted(user: User) {
    console.log("From Parent|-------->" + JSON.stringify(user));
    this.selectedUser = user;
  }

  public onUserReset(resetUser: boolean) {
    console.log("Reseting user:|-------->" + JSON.stringify(resetUser));

    if (resetUser) {
      this.selectedUser = {
        id: "",
        gender: "",
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        country: "",
      };
    }
  }

}
