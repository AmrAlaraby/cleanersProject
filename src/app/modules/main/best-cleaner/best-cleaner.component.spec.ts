import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestCleanerComponent } from './best-cleaner.component';

describe('BestCleanerComponent', () => {
  let component: BestCleanerComponent;
  let fixture: ComponentFixture<BestCleanerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BestCleanerComponent]
    });
    fixture = TestBed.createComponent(BestCleanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
