import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidbearComponent } from './sidbear.component';

describe('SidbearComponent', () => {
  let component: SidbearComponent;
  let fixture: ComponentFixture<SidbearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidbearComponent]
    });
    fixture = TestBed.createComponent(SidbearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
