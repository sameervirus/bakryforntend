import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveDispatchComponent } from './receive-dispatch.component';

describe('ReceiveDispatchComponent', () => {
  let component: ReceiveDispatchComponent;
  let fixture: ComponentFixture<ReceiveDispatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveDispatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
