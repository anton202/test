import { Component, OnInit, Input } from '@angular/core';
import { WeatherCardService } from './weather-card.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
  @Input() public dailyForecast:{Date,Temperature,Day};
  public dayOfWeek: string;
  public temperature: number;
  private iconNumber: string | number;
  public weatherIcon:string;
  

  constructor(private weatherCardService: WeatherCardService) { }

  ngOnInit() {
    this.temperature = this.weatherCardService.convertToCelsius(this.dailyForecast.Temperature.Maximum.Value)
    this.dayOfWeek = this.weatherCardService.getDayOfWeek(this.dailyForecast.Date)
    this.iconNumber = this.dailyForecast.Day.Icon < 10? '0' + this.dailyForecast.Day.Icon : this.dailyForecast.Day.Icon;
    this.weatherIcon= `https://developer.accuweather.com/sites/default/files/${this.iconNumber}-s.png`
  }

  
}
