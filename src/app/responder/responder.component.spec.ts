import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderComponent } from './responder.component';

describe('ResponderComponent', () => {
  let component: ResponderComponent;
  let fixture: ComponentFixture<ResponderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
