import {
  Component,
  OnInit,
  ViewEncapsulation,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import { User } from "../../models/user.model";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";

import * as UserState from "../../store/states/user.state";
import * as UserActions from "../../store/actions/user.actions";
import * as UserSelectors from "../../store/selectors/user.selectors";

import { SelectItem, Message } from "primeng/api";

import { AppConfigManager } from "../../../../utils/app.config.manager"
import { Country } from 'src/app/models/country.model';
@Component({
  selector: "signup",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  @Output() create = new EventEmitter<User>();

  /**
   * Loading Observable
   */
  loading$ = this.store.pipe(select(UserSelectors.getLoading));

  msgs: Message[] = [];
  selectedCountry: string;

  countries: Country[] = [];
  countryItems: SelectItem[] = [];

  userform: FormGroup;
  genders: SelectItem[];

  constructor(
    private store: Store<UserState.State>,
    private fb: FormBuilder,
    private appConfigManager: AppConfigManager
  ) {}

  ngOnInit(): void {
    this.userform = this.fb.group({
      firstname: new FormControl("", Validators.required),
      lastname: new FormControl("", Validators.required),
      gender: new FormControl("", Validators.required),
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      "confirm-password": new FormControl("", Validators.required),
      country: new FormControl("", Validators.required),
    });

    this.genders = [];
    this.genders.push({ label: "Select Gender", value: "" });
    this.genders.push({ label: "Male", value: "Male" });
    this.genders.push({ label: "Female", value: "Female" });

    this.appConfigManager.getCountries().subscribe(
      (data) => (this.countries = data),
      (error) => {
        throw error;
      },
      () => {
        this.countries.forEach((c) => {
          this.countryItems.push({
            label: c.name,
            value: c.name,
            icon: c.code

          });
        });
      }
    );
  }

  createUser(user: User) {
    this.store.dispatch(UserActions.addUser({ user }));
  }

  show() {
    this.msgs.push({
      severity: "info",
      summary: "Info Message",
      detail: "PrimeNG rocks",
    });
  }

  hide() {
    this.msgs = [];
  }
}
