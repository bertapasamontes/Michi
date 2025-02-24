import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersInAppComponent } from './users-in-app.component';

describe('UsersInAppComponent', () => {
  let component: UsersInAppComponent;
  let fixture: ComponentFixture<UsersInAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersInAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersInAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
