import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class WeatherCardService {
    public daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wedensday', 'Thursday', 'Friday', 'Saturday'];
    
    constructor(private http: HttpClient) { }

    public getDayOfWeek(date): string {
        const getDate = new Date(date).getDay();
        return this.daysOfWeek[getDate];
    }

    public convertToCelsius(temperature: number): number {
        return Math.floor((temperature - 32) * 5 / 9);
    }
}
