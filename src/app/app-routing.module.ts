import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JokesFavoriteComponent } from './features/jokes/pages/jokes-favorite/jokes-favorite.component';
import { JokesListComponent } from './features/jokes/pages/jokes-list/jokes-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo : 'list',
    pathMatch: 'full'
  }, {
    path: 'list',
    component: JokesListComponent
  },
  {
    path: 'favorites',
    component: JokesFavoriteComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
