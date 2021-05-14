import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRequestsComponent } from './movie-requests.component';

describe('MovieRequestsComponent', () => {
  let component: MovieRequestsComponent;
  let fixture: ComponentFixture<MovieRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
