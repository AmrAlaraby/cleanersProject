import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasbourdComponent } from './dasbourd.component';

describe('DasbourdComponent', () => {
  let component: DasbourdComponent;
  let fixture: ComponentFixture<DasbourdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DasbourdComponent]
    });
    fixture = TestBed.createComponent(DasbourdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
