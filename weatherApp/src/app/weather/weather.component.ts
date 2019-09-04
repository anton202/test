import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  public searchForm: FormGroup;
  public locationNameSuggestion:object[] = [];
  public locationKey: number | boolean;
  public locationNameDoseNotExist: boolean;
  public forecast:[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.searchFormItialization();
  }

  private searchFormItialization(): void{
    this.searchForm = new FormGroup({
      locationName: new FormControl(null)
    })
  }

  public getLocationName(): void{
    const locationName = this.searchForm.get('locationName').value;

    this.apiService.locationNameSuggestion(locationName)
      .subscribe(locationNames =>{
        this.locationNameSuggestion = locationNames;
      })
  }

  public getWeather(): void{
    const locationName = this.searchForm.get('locationName').value;
    const locationKey = this.apiService.getLocationKey(this.locationNameSuggestion,locationName)
    if(!locationKey){
      this.locationNameDoseNotExist = true;
      return
    }
    this.locationNameDoseNotExist = false;
    this.apiService.getWeatherForecast(locationKey)
      .subscribe(forecast =>{
        this.forecast = forecast.DailyForecasts;
        console.log(forecast)
      })
  }
}
