import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarypageComponent } from './diarypage.component';

describe('DiarypageComponent', () => {
  let component: DiarypageComponent;
  let fixture: ComponentFixture<DiarypageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiarypageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiarypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
