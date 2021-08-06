import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoginPortalComponent } from './admin-login-portal.component';

describe('AdminLoginPortalComponent', () => {
  let component: AdminLoginPortalComponent;
  let fixture: ComponentFixture<AdminLoginPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLoginPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoginPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
