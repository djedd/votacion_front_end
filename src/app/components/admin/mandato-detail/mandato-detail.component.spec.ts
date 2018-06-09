import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MandatoDetailComponent } from './mandato-detail.component';

describe('MandatoDetailComponent', () => {
  let component: MandatoDetailComponent;
  let fixture: ComponentFixture<MandatoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MandatoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MandatoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
