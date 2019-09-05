import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { WeatherCardService } from '../weather-card/weather-card.service';
import * as FavoritesAction from '../favorites/store/favorites.action';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  public searchForm: FormGroup;
  public locationNameSuggestion: object[] = [];
  public locationKey: number | boolean;
  public locationNameDoseNotExist: boolean;
  public forecast: any[];
  public fetchingForecast: boolean = false;
  public weeklyWeatherStatus: string;
  private geoLocationWeather: Observable<[]>
  public locationName: string;
  public temperature: number;
  public weatherIcon: string;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private weatherCardService: WeatherCardService,
    private store: Store<{ favorites: { favorites } }>
  ) { }

  ngOnInit() {
    this.searchFormItialization();
    this.defaultForecast()
  }

  private searchFormItialization(): void {
    this.searchForm = new FormGroup({
      locationName: new FormControl(null)
    })
  }

  public addToFavorites(): void{
    this.store.dispatch(new FavoritesAction.AddToFavorites({ id: this.locationKey, name: this.locationName, weather: this.temperature, icon:this.weatherIcon }))
  }

  public getLocationName(): void {
    const locationName = this.searchForm.get('locationName').value;

    this.apiService.locationNameSuggestion(locationName)
      .subscribe(locationNames => {
        this.locationNameSuggestion = locationNames;
      })
  }

  public getWeather(): void {
    const locationName = this.searchForm.get('locationName').value;
    const locationKey = this.apiService.getLocationKey(this.locationNameSuggestion, locationName)
    if (!locationKey) {
      this.locationNameDoseNotExist = true;
      return
    }
    this.fetchingForecast = true;
    this.locationNameDoseNotExist = false;
    this.apiService.getWeatherForecast(locationKey)
    .subscribe(forecast => {
      console.log(forecast)
      this.locationKey = locationKey;
        this.fetchingForecast = false;
        this.forecast = forecast.DailyForecasts;
        this.weeklyWeatherStatus = forecast.Headline.Text;
        this.locationName = locationName;
        this.temperature = this.setTemperature(forecast);
        this.weatherIcon = this.setWeatherIcon(forecast.DailyForecasts[0].Day.Icon);
      })
  }

  private defaultForecast() {
    const locationKey = this.route.snapshot.paramMap.get('locationKey');
    console.log(locationKey)
    if (locationKey) {
     return this.getFavoriteForecast(locationKey);
    }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(this.getForecastByGeoLocation.bind(this))
    } else {
      this.getTelAvivForecast();
    }
  }

  private getForecastByGeoLocation(position: any): void {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    this.geoLocationWeather = this.apiService.getLocationKeyByGeoLocation(latitude, longitude)
      .pipe(mergeMap((location: { Key }) => this.apiService.getWeatherForecast(location.Key)));

    this.geoLocationWeather.subscribe((forecast: any) => {
      this.forecast = forecast.DailyForecasts
      this.weeklyWeatherStatus = forecast.Headline.Text;
      this.temperature = this.setTemperature(forecast);
      this.weatherIcon = this.setWeatherIcon(forecast.DailyForecasts[0].Day.Icon);
    })

    this.apiService.getLocationKeyByGeoLocation(latitude, longitude)
      .subscribe((locationInfo: { LocalizedName }) => {
        this.locationName = locationInfo.LocalizedName;
      })
  }

  private getTelAvivForecast(): void {
    const telAvivLocationKey = 215854;
    this.apiService.getWeatherForecast(telAvivLocationKey)
      .subscribe(forecast => {
        this.forecast = forecast.DailyForecasts;
        this.weeklyWeatherStatus = forecast.Headline.Text;
        this.locationName = 'Tel-Aviv'
      })
  }

  private getFavoriteForecast(locationKey: number | string): void {
    this.apiService.getWeatherForecast(locationKey)
      .subscribe(forecast => {
        this.forecast = forecast.DailyForecasts;
        this.locationName = this.route.snapshot.paramMap.get('locationName');
        this.temperature = this.setTemperature(forecast)
        this.weatherIcon = this.setWeatherIcon(forecast.DailyForecasts[0].Day.Icon);
        this.weeklyWeatherStatus = forecast.Headline.Text;
      })
  }

  private setTemperature(forecastObj) {
    return this.weatherCardService.convertToCelsius(forecastObj.DailyForecasts[0].Temperature.Maximum.Value);
  }

  private setWeatherIcon(iconNumber) {
    if (iconNumber < 10) {
      return `https://developer.accuweather.com/sites/default/files/${'0' + iconNumber}-s.png`
    }
    return `https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`
  }

}


