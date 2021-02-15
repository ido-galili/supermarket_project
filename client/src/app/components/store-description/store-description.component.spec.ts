import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDescriptionComponent } from './store-description.component';

describe('StoreDescriptionComponent', () => {
  let component: StoreDescriptionComponent;
  let fixture: ComponentFixture<StoreDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
