import {
  Component,
  OnInit,
  ViewEncapsulation,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
} from "@angular/core";
import { User } from "../../models/user.model";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";

import * as UserActions from "../../store/actions/user.actions";

import { SelectItem, Message } from "primeng/api";

import { AppConfigManager } from "../../../../utils/app.config.manager"
import { Country } from 'src/app/models/country.model';
import { UserFacade } from '../../facades/user.facade';
import { Observable } from 'rxjs';
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
  loading$: Observable<any>;

  msgs: Message[] = [];

  countries: Country[] = [];
  countryItems: SelectItem[] = [];

  userform: FormGroup;
  genders: SelectItem[];

  constructor(
    private fb: FormBuilder,
    private appConfigManager: AppConfigManager,
    private userFacade: UserFacade
  ) {
  }

  ngOnInit(): void {
    this.loading$ = this.userFacade.isLoading$;

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
            value: c.code,
            icon: c.code

          });
        });
      }
    );
  }

  createUser(user: User) {
    // const countryMap = new Map<string, string>(
    //   this.countryItems.map(x => [x.label, x.value] as [string, string])
    // );
    // console.log(user.country)
    // console.log(countryMap)
    // console.log(countryMap.get(user.country))
    // user.country = countryMap.get(user.country);
    this.userFacade.create( user );
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
