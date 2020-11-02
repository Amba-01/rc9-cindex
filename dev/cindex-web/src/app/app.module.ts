import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { AppEffects } from "./store/effects/app.effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { reducers, metaReducers } from "./store/reducers";

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './modules/users/users.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    AppRoutingModule,
    UserModule,
    RoomsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,

      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
      },
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: "NgRx Book Store App",
      logOnly: environment.production
    }),
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
