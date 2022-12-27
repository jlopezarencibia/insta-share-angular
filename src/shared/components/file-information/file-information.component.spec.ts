import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileInformationComponent } from './file-information.component';

describe('FileInformationComponent', () => {
  let component: FileInformationComponent;
  let fixture: ComponentFixture<FileInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
