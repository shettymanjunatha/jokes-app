import { IJoke } from './../../../../core/models/joke.model';
import { Component, Inject, OnInit } from '@angular/core';
import { LocalService } from 'src/app/core/services/local.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-jokes-favorite',
  templateUrl: './jokes-favorite.component.html',
  styleUrls: ['./jokes-favorite.component.scss']
})
export class JokesFavoriteComponent implements OnInit {

  jokesfavInfo: any = [];
  JOKES_FAVORITES: string = "jokesFavorites";

  constructor(private localService: LocalService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.jokesfavInfo = this.localService.getData(this.JOKES_FAVORITES);
    this.jokesfavInfo = this.jokesfavInfo ? JSON.parse(this.jokesfavInfo) : [];
  }

  onDeleteFavorites(jokes: IJoke)
  {

    if (this.jokesfavInfo?.length >= 0) {
      
      this.jokesfavInfo = this.jokesfavInfo.filter((fav : IJoke) => {
        return fav.id!=jokes.id
      })

      this.localService.saveData(this.JOKES_FAVORITES, JSON.stringify(this.jokesfavInfo));
      this.showFavoritesSuccess();
    } 

  }

  showFavoritesSuccess() {
    this.toastService.show('Successfully deleted from favorites', { classname: 'bg-success text-light', delay: 1000 });
  }
  
}
