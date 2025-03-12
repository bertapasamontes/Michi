import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBigInfoComponent } from './profile-big-info.component';

describe('ProfileBigInfoComponent', () => {
  let component: ProfileBigInfoComponent;
  let fixture: ComponentFixture<ProfileBigInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBigInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileBigInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
