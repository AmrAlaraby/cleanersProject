import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCatigoriesComponent } from './admin-catigories.component';

describe('AdminCatigoriesComponent', () => {
  let component: AdminCatigoriesComponent;
  let fixture: ComponentFixture<AdminCatigoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCatigoriesComponent]
    });
    fixture = TestBed.createComponent(AdminCatigoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
