import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTwoLinesComponent } from './item-two-lines.component';

describe('ItemTwoLinesComponent', () => {
  let component: ItemTwoLinesComponent;
  let fixture: ComponentFixture<ItemTwoLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTwoLinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemTwoLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
