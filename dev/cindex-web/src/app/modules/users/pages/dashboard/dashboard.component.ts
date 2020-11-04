import { Component, OnInit } from '@angular/core';
import { Store, select } from "@ngrx/store";
import { Observable } from 'rxjs';
import { City } from 'src/app/models/city.model';
import { Country } from 'src/app/models/country.model';
import { AppConfigManager } from 'src/app/utils/app.config.manager';

import { User } from '../../models/user.model';

import * as UserSelectors from "../../store/selectors/user.selectors";
import * as UserState from "../../store/states/user.state";
import * as UserActions from "../../store/actions/user.actions";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users$: Observable<User[]>;
  loadedUsers$: Observable<User[]>;

  selectedUser: User;
  countries: Country[];
  cities: City[];

  constructor(
    private store: Store<UserState.State>,
    private appConfigManager: AppConfigManager
  ) {}

  ngOnInit() {
    this.users$ = this.store.pipe(select(UserSelectors.getUsers));
    this.store.dispatch(UserActions.loadAll({ offset: 10, limit: 100 }));

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
