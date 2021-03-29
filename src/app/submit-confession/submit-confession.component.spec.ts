import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitConfessionComponent } from './submit-confession.component';

describe('SubmitConfessionComponent', () => {
  let component: SubmitConfessionComponent;
  let fixture: ComponentFixture<SubmitConfessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitConfessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitConfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
