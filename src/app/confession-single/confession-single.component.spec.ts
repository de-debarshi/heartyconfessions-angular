import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfessionSingleComponent } from './confession-single.component';

describe('ConfessionSingleComponent', () => {
  let component: ConfessionSingleComponent;
  let fixture: ComponentFixture<ConfessionSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfessionSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfessionSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
