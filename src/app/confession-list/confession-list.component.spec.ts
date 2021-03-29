import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfessionListComponent } from './confession-list.component';

describe('ConfessionListComponent', () => {
  let component: ConfessionListComponent;
  let fixture: ComponentFixture<ConfessionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfessionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
