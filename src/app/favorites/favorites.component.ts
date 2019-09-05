import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites:any[];

  constructor(private store: Store<{favorites:{favorites}}>) { }

  ngOnInit() {
    this.store.select('favorites')
      .subscribe(favorites =>{
        this.favorites = favorites.favorites;
      })
  }

}
