import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { JokesListComponent } from './features/jokes/pages/jokes-list/jokes-list.component';
import { JokesFavoriteComponent } from './features/jokes/pages/jokes-favorite/jokes-favorite.component';
import { FormsModule } from '@angular/forms';
import { ToastContainerComponent } from './shared/components/toast-container/toast-container.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    JokesListComponent,
    JokesFavoriteComponent,
    ToastContainerComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
