import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './users.routing.module';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { TabViewModule } from "primeng/tabview";
import { PasswordModule } from "primeng/password";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { InputTextModule } from "primeng/inputtext";
import { AccordionModule } from "primeng/accordion";
import { TableModule } from "primeng/table";
import { RadioButtonModule } from "primeng/radiobutton";
import { PanelModule } from "primeng/panel";
import { DialogModule } from "primeng/dialog";
import {ProgressBarModule} from 'primeng/progressbar';
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { MultiSelectModule } from "primeng/multiselect";
import { TreeModule } from "primeng/tree";
import {FieldsetModule} from 'primeng/fieldset';

import { HttpClientModule } from "@angular/common/http";

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ViewTableComponent } from "./components/view-table/view-table.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { CountryCityTreeComponent } from "src/app/components/country-city-tree/country-city-tree.component";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromState from "./store/states/user.state";
import * as fromReducer from "./store/reducers/user.reducer";
import * as fromEffect from "./store/effects/user.effects";

@NgModule({
  declarations: [
    DashboardComponent,
    SignUpComponent,
    ViewTableComponent,
    CountryCityTreeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    RadioButtonModule,
    MessageModule,
    MessagesModule,
    DropdownModule,
    PasswordModule,
    ButtonModule,
    TabViewModule,
    TableModule,
    ProgressBarModule,
    PanelModule,
    DialogModule,
    FieldsetModule,
    AccordionModule,
    CalendarModule,
    TreeModule,
    MultiSelectModule,
    HttpClientModule,
    UserRoutingModule,
    UserRoutingModule,
    StoreModule.forFeature(fromState.userFeatureKey, fromReducer.reducer),
    EffectsModule.forFeature([fromEffect.UserEffects]),
  ]
})
export class UserModule { }
