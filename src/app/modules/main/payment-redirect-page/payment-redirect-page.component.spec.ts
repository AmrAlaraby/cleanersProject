import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentRedirectPageComponent } from './payment-redirect-page.component';

describe('PaymentRedirectPageComponent', () => {
  let component: PaymentRedirectPageComponent;
  let fixture: ComponentFixture<PaymentRedirectPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentRedirectPageComponent]
    });
    fixture = TestBed.createComponent(PaymentRedirectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
