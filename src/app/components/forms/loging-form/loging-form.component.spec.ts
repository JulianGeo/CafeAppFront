import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogingFormComponent } from './loging-form.component';

describe('LogingFormComponent', () => {
  let component: LogingFormComponent;
  let fixture: ComponentFixture<LogingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
