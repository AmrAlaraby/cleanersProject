import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDashbordComponent } from './layout-dashbord.component';

describe('LayoutDashbordComponent', () => {
  let component: LayoutDashbordComponent;
  let fixture: ComponentFixture<LayoutDashbordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutDashbordComponent]
    });
    fixture = TestBed.createComponent(LayoutDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
