import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewBranchesComponent } from './review-branches.component';

describe('ReviewBranchesComponent', () => {
  let component: ReviewBranchesComponent;
  let fixture: ComponentFixture<ReviewBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewBranchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
