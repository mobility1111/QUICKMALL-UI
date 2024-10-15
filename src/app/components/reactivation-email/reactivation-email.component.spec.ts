import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivationEmailComponent } from './reactivation-email.component';

describe('ReactivationEmailComponent', () => {
  let component: ReactivationEmailComponent;
  let fixture: ComponentFixture<ReactivationEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReactivationEmailComponent]
    });
    fixture = TestBed.createComponent(ReactivationEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
