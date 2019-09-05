import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { MaterialModule } from './material.module'
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { favoritesReducer } from './favorites/store/favorites.reducer';
import { ErrorMessageComponent } from './error-message/error-message.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    WeatherComponent,
    WeatherCardComponent,
    FavoritesComponent,
    ErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    StoreModule.forRoot({favorites: favoritesReducer})
  ],
  entryComponents: [
    ErrorMessageComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
