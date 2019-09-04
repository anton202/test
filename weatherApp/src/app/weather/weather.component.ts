import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


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

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.searchFormItialization();
    this.defaultForecast()
  }

  private searchFormItialization(): void {
    this.searchForm = new FormGroup({
      locationName: new FormControl(null)
    })
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
        this.fetchingForecast = false;
        this.forecast = forecast.DailyForecasts;
        this.weeklyWeatherStatus = forecast.Headline.Text;
      })
  }

  private async defaultForecast() {
    const locationKey = this.route.snapshot.paramMap.get('locationKey');
    if (locationKey) {
      return this.apiService.getWeatherForecast(locationKey)
        .subscribe(forecast => {
          this.forecast = forecast.DailyForecasts;
        })
    }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.apiService.getLocationKeyByGeoLocation({ latitude, longitude })
          .subscribe((location: { Key }) => {
            this.apiService.getWeatherForecast(location.Key)
              .subscribe(forecast => {
                this.forecast = forecast.DailyForecasts
                this.weeklyWeatherStatus = forecast.Headline.Text;
              })
          })
      })
    } else {
      const telAvivLocationKey = 215854;
      this.apiService.getWeatherForecast(telAvivLocationKey)
        .subscribe(forecast => {
          this.forecast = forecast.DailyForecasts;
          this.weeklyWeatherStatus = forecast.Headline.Text;
        })
    }
  }

}
