import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CCardComponent } from './ccard.component';

describe('CCardComponent', () => {
  let component: CCardComponent;
  let fixture: ComponentFixture<CCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
