import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCatrgoryComponent } from './choose-catrgory.component';

describe('ChooseCatrgoryComponent', () => {
  let component: ChooseCatrgoryComponent;
  let fixture: ComponentFixture<ChooseCatrgoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseCatrgoryComponent]
    });
    fixture = TestBed.createComponent(ChooseCatrgoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
