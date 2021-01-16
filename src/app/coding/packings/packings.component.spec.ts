import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingsComponent } from './packings.component';

describe('PackingsComponent', () => {
  let component: PackingsComponent;
  let fixture: ComponentFixture<PackingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
