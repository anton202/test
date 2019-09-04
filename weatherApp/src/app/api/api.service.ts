import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiKey: string = '7Is6CpWd2Q1WMUQXR8AY9VJKLJte6xGM';

  constructor(private http: HttpClient) { }

  public locationNameSuggestion(locationName): Observable<any>{
    return this.http.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.apiKey}q=${locationName}`)
  }
}
