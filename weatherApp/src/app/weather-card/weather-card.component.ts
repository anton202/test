import { Component, OnInit, Input } from '@angular/core';
import { WeatherCardService } from './weather-card.service';
import { favorite } from '../favorites/store/favorites.action';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
  @Input() public dailyForecast:{Date,Temperature,Day};
  @Input() public favoriteData:favorite;
  public dayOfWeek: string;
  public temperature: number;
  private iconNumber: string | number;
  public weatherIcon:string | number;
  public locationName: string
  

  constructor(private weatherCardService: WeatherCardService) { }

  ngOnInit() {
    if(this.dailyForecast){
    this.temperature = this.weatherCardService.convertToCelsius(this.dailyForecast.Temperature.Maximum.Value)
    this.dayOfWeek = this.weatherCardService.getDayOfWeek(this.dailyForecast.Date)
    this.iconNumber = this.dailyForecast.Day.Icon < 10? '0' + this.dailyForecast.Day.Icon : this.dailyForecast.Day.Icon;
    this.weatherIcon= `https://developer.accuweather.com/sites/default/files/${this.iconNumber}-s.png`
  }else{
    this.temperature = this.favoriteData.weather;
    this.locationName = this.favoriteData.name
    this.weatherIcon = this.favoriteData.icon;
  }
}
 
  
}
