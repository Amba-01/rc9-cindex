import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCityTreeComponent } from './country-city-tree.component';

describe('CountryCityTreeComponent', () => {
  let component: CountryCityTreeComponent;
  let fixture: ComponentFixture<CountryCityTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryCityTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCityTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
