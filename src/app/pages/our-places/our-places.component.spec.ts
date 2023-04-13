import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurPlacesComponent } from './our-places.component';

describe('OurPlacesComponent', () => {
  let component: OurPlacesComponent;
  let fixture: ComponentFixture<OurPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurPlacesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
