import { IJoke } from './../../../../core/models/joke.model';
import { Observable } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { JokesService } from '../../services/jokes.service';
import { LocalService } from 'src/app/core/services/local.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-jokes-list',
  templateUrl: './jokes-list.component.html',
  styleUrls: ['./jokes-list.component.scss']
})
export class JokesListComponent implements OnInit {

  MAX_LENGTH_JOKES: number = 10;

  JOKES_FAVORITES: string = "jokesFavorites";
  JOKES_LiST: string = "jokesList";

  jokes$!: Observable<IJoke>;

  jokesInfo: IJoke[] = [];

  constructor(private jokeService: JokesService,
    private localService: LocalService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.jokesInfo = this.getJokesLocal();
    this.getAllJokes();
  }

  getAllJokes() {
    this.jokes$ = this.jokeService.getAllJokes();
    this.jokes$.subscribe((jokes: IJoke) => {

      if (this.jokesInfo.length >= this.MAX_LENGTH_JOKES) {
        this.jokesInfo.shift();
      }
      this.jokesInfo.push(jokes);

      this.addJokes(this.jokesInfo)

    });
  }

  addJokes(jokes_list: IJoke[])
  {
    this.localService.saveData(this.JOKES_LiST, JSON.stringify(jokes_list));
  }

  getJokesLocal() : IJoke[] {
    const jokesInfoList = <string> this.localService.getData(this.JOKES_LiST);
    this.jokesInfo = JSON.parse(jokesInfoList);
    
    return  this.jokesInfo || [];
  }

  onAddFavorites(jokes: IJoke) {
    
    let jokes_favorite: any | null = this.localService.getData(this.JOKES_FAVORITES);

    jokes_favorite = jokes_favorite ? JSON.parse(jokes_favorite) : [];

    if (jokes_favorite != null && jokes_favorite?.length <= this.MAX_LENGTH_JOKES) {
      jokes_favorite.push(jokes);
      this.localService.saveData(this.JOKES_FAVORITES, JSON.stringify(jokes_favorite));
      this.showFavoritesSuccess();
    } else {
      this.showFavoritesWarning();
    }

  }

  showFavoritesSuccess() {
    this.toastService.show('Successfully added to favorites', { classname: 'bg-success text-light', delay: 2000 });
  }
  showFavoritesWarning() {
    this.toastService.show('Maximum 10 favorites can be added. Please delete to add new.', { classname: 'bg-danger text-light', delay: 3000 });
  }

}
