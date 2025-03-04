import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSmallInfo } from './ProfileSmallInfo.component';

describe('ProfileSmallInfo', () => {
  let component: ProfileSmallInfo;
  let fixture: ComponentFixture<ProfileSmallInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSmallInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSmallInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
