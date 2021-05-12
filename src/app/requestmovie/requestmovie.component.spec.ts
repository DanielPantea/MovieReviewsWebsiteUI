import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestmovieComponent } from './requestmovie.component';

describe('RequestmovieComponent', () => {
  let component: RequestmovieComponent;
  let fixture: ComponentFixture<RequestmovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestmovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
