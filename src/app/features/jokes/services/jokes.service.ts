import { IJoke } from './../../../core/models/joke.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, timer, switchMap, retry, share, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JokesService implements OnDestroy {

  private API_URL = environment.API_URL;
  private TOGGLE_INTERVAL = 5000;

  private allJokes$: Observable<IJoke>;
  private stopPolling: any = new Subject();

  constructor(private http: HttpClient) {
    this.allJokes$ = timer(1, this.TOGGLE_INTERVAL).pipe(
       switchMap(() => http.get<IJoke>(`${this.API_URL}jokes/random`)),
       takeUntil(this.stopPolling)
    );
  }

  getAllJokes(): Observable<IJoke> {
      return this.allJokes$;
  }

  ngOnDestroy() {
     this.stopPolling.next();
  }

}
