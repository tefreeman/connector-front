import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientMatcherComponent } from './ingredient-matcher.component';

describe('IngredientMatcherComponent', () => {
  let component: IngredientMatcherComponent;
  let fixture: ComponentFixture<IngredientMatcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientMatcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientMatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
