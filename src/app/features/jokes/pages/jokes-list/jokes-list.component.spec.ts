import { IJoke } from './../../../../core/models/joke.model';
import { LocalService } from 'src/app/core/services/local.service';
import { JOKE, JOKELIST } from './../../../../../assets/mock-data/joke';
import { JokesService } from './../../services/jokes.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { JokesListComponent } from './jokes-list.component';
import { of } from 'rxjs';
import { ToastService } from 'src/app/core/services/toast.service';

describe('JokesListComponent', () => {
  let component: JokesListComponent;
  let fixture: ComponentFixture<JokesListComponent>;
  const MAX_JOKES_LENGTH = {
    maxReached: 4,
    jokesLessThanMax: 10,
    jokesGreaterThanMax: 3
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokesListComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get list of jokes', fakeAsync((done: any) => {
    const jokeService = TestBed.inject(JokesService);
    const list = {...JOKE};

    spyOn(jokeService, 'getAllJokes').and.returnValues(of(list));

    component.getAllJokes();

    fixture.detectChanges();

    expect(component.jokesInfo.length).toBeGreaterThan(0);
  }));


  it('should add to favorite when list of jokes is less than max length', fakeAsync((done: any) => {
    const localService = TestBed.inject(LocalService);
    const toastService = TestBed.inject(ToastService);
    let joke:IJoke = {...JOKE};
    const list = [...JOKELIST];

    component.MAX_LENGTH_JOKES = MAX_JOKES_LENGTH.jokesLessThanMax;

    spyOn(localService, 'getData').and.returnValues(JSON.stringify(list));

    spyOn(localService, 'saveData');
    spyOn(toastService, 'show');

    component.onAddFavorites(joke);

    fixture.detectChanges();
    
    expect(localService.saveData).toHaveBeenCalledTimes(1);

    expect(toastService.show).toHaveBeenCalledTimes(1);
    expect(toastService.show).toHaveBeenCalledWith('Successfully added to favorites', { classname: 'bg-success text-light', delay: 2000 });
  }));

  it('should not add to favorite when jokes list is greater than max length', fakeAsync((done: any) => {
    const localService = TestBed.inject(LocalService);
    const toastService = TestBed.inject(ToastService);

    let joke:IJoke = {...JOKE};
    const list = [...JOKELIST];

    component.MAX_LENGTH_JOKES = MAX_JOKES_LENGTH.jokesGreaterThanMax;

    spyOn(localService, 'getData').and.returnValues(JSON.stringify(list));

    spyOn(toastService, 'show');

    component.onAddFavorites(joke);

    fixture.detectChanges();
    
    expect(toastService.show).toHaveBeenCalledTimes(1);
    expect(toastService.show).toHaveBeenCalledWith('Maximum 10 favorites can be added. Please delete to add new.', { classname: 'bg-danger text-light', delay: 3000 });
  }));

});
