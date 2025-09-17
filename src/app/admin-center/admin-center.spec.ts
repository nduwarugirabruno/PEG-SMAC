import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCenter } from './admin-center';

describe('AdminCenter', () => {
  let component: AdminCenter;
  let fixture: ComponentFixture<AdminCenter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCenter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCenter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
