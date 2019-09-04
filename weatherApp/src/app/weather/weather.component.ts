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

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.searchFormItialization();
  }

  private searchFormItialization(){
    this.searchForm = new FormGroup({
      locationName: new FormControl(null);
    })
  }

}
