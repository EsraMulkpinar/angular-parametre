import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BCardComponent } from './bcard.component';

describe('BCardComponent', () => {
  let component: BCardComponent;
  let fixture: ComponentFixture<BCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
