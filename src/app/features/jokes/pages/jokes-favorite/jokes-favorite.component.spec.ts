import { ToastService } from './../../../../core/services/toast.service';
import { JOKE, JOKELIST } from './../../../../../assets/mock-data/joke';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokesFavoriteComponent } from './jokes-favorite.component';

describe('JokesFavoriteComponent', () => {
  let component: JokesFavoriteComponent;
  let fixture: ComponentFixture<JokesFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokesFavoriteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokesFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.jokesfavInfo = [...JOKELIST];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete favorite', () => {

    const toastService = TestBed.inject(ToastService);
    spyOn(toastService, 'show');

    const joke = {...JOKE};
    const message = 'Successfully deleted from favorites';
    const property = { classname: 'bg-success text-light', delay: 1000 };

    component.onDeleteFavorites(joke);
    expect(toastService.show).toHaveBeenCalledTimes(1);
    expect(toastService.show).toHaveBeenCalledWith(message, property);
  });

});
