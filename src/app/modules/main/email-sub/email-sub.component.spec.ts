import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSubComponent } from './email-sub.component';

describe('EmailSubComponent', () => {
  let component: EmailSubComponent;
  let fixture: ComponentFixture<EmailSubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailSubComponent]
    });
    fixture = TestBed.createComponent(EmailSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
