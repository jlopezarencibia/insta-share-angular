import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionLoadingComponent } from './section-loading.component';

describe('SectionLoadingComponent', () => {
  let component: SectionLoadingComponent;
  let fixture: ComponentFixture<SectionLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionLoadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
