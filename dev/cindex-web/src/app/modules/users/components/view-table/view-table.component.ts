import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import * as UserState from "../../store/states/user.state";
import * as UserActions from "../../store/actions/user.actions";
import { User } from "../../models/user.model";
import { Store } from "@ngrx/store";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { SelectItem } from "primeng/api/selectitem";
import { Message } from "primeng/api/message";

@Component({
  selector: "view-table",
  templateUrl: "./view-table.component.html",
  styleUrls: ["./view-table.component.scss"],
})
export class ViewTableComponent implements OnInit, OnChanges {
  @Input() loading: boolean;
  @Input() users: User[];

  @Output() private userToEmit = new EventEmitter<User>();

  msgs: Message[] = [];
  selectedCountry: string;

  countries: SelectItem[];
  userform: FormGroup;
  genders: SelectItem[];

  selectedUser: User;
  selectedUsers: User[];
  cols: any[];

  display = false;

  constructor(
    private store: Store<UserState.State>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.cols = [
      { field: "gender", header: "Gender" },
      { field: "firstname", header: "First Name" },
      { field: "lastname", header: "Last Name" },
      { field: "username", header: "Username" },
      { field: "email", header: "Email" },
      { field: "country", header: "Country" },
    ];
  }

  inittializeForm(currentUser: User) {
    /**
     * Form Information
     */
    this.userform = this.fb.group({
      id: new FormControl(currentUser.id),
      gender: new FormControl(currentUser.gender, Validators.required),
      firstname: new FormControl(currentUser.firstname, Validators.required),
      lastname: new FormControl(currentUser.lastname, Validators.required),
      username: new FormControl(currentUser.username, [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl(currentUser.password, Validators.required),
      email: new FormControl(currentUser.email, Validators.required),
      country: new FormControl(currentUser.country, Validators.required),
    });

    this.genders = [];
    this.genders.push({ label: "Select Gender", value: "" });
    this.genders.push({ label: "Male", value: "Male" });
    this.genders.push({ label: "Female", value: "Female" });

    this.countries = [
      { label: "Germany", value: "Germany", icon: "de.svg" },
      { label: "France", value: "France", icon: "fr.svg" },
      { label: "Russia", value: "Russia", icon: "ru.svg" },
      { label: "China", value: "China", icon: "cn.svg" },
      { label: "Brazil", value: "Brazil", icon: "br.svg" },
      { label: "Spain", value: "Spain", icon: "es.svg" },
      { label: "Japan", value: "Japan", icon: "jp.svg" },
      { label: "U.K", value: "U.K", icon: "gb.svg" },
      { label: "U.S.A", value: "U.S.A", icon: "us.svg" },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(
      "OnChanges Users|---------->" + JSON.stringify(this.users.length)
    );
  }

  onDateSelect(value) {
    console.log("Selected Item|---------->" + JSON.stringify(value));
  }
  onRowSelect(event) {
    console.log("Selected Item|---------->" + JSON.stringify(event.data));
  }

  onRowUnselect(event) {
    console.log("Selected Item|---------->" + event.data);
  }

  viewUserDialog(user: User) {
    console.log(
      "View User:|-->" + user.id + "-" + user.gender + "-" + user.username
    );
    this.inittializeForm(user);
    this.display = true;
  }

  editUserDialog(user: User) {
    console.log(
      "Edit User:|-->" + user.id + "-" + user.gender + "-" + user.username
    );
    this.inittializeForm(user);
    this.display = true;
  }

  closeDialog() {
    this.display = false;
  }

  updateUser(user: User) {
    console.log("Final:|----->" + JSON.stringify(user));
    this.store.dispatch(UserActions.update({ user }));
    this.display = false;
  }

  deleteUser(user: User) {
    this.store.dispatch(UserActions.remove({ id: user.id }));
  }
}
