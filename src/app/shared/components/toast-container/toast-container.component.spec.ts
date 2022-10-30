import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastService } from 'src/app/core/services/toast.service';

import { ToastContainerComponent } from './toast-container.component';

describe('ToastContainerComponent', () => {
  let component: ToastContainerComponent;
  let fixture: ComponentFixture<ToastContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastContainerComponent ],
      providers: [ToastService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call template', () => {
    expect(component).toBeTruthy();
  });
});
