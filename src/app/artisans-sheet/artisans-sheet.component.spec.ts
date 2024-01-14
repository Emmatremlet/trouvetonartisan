import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisansSheetComponent } from './artisans-sheet.component';

describe('ArtisansSheetComponent', () => {
  let component: ArtisansSheetComponent;
  let fixture: ComponentFixture<ArtisansSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtisansSheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtisansSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
