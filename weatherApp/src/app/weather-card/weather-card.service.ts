import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class WeatherCardService {
    
    public daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wedensday', 'Thursday', 'Friday', 'Saturday'];
    constructor(private http: HttpClient) { }

    public getIcon(iconNumber) {
        if(iconNumber < 10){
            iconNumber = '0' + iconNumber
        }
        return this.http.get(`https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`);
    }

    public getDayOfWeek(date) {
        const getDate = new Date(date).getDay();
        return this.daysOfWeek[getDate];
    }

    public convertToCelsius(temperature: number) {
        return Math.floor((temperature - 32) * 5 / 9);
    }
}
