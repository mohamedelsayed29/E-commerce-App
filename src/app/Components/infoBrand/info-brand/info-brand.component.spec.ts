import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBrandComponent } from './info-brand.component';

describe('InfoBrandComponent', () => {
  let component: InfoBrandComponent;
  let fixture: ComponentFixture<InfoBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoBrandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
