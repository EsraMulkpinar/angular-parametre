import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCardPanelComponent } from './dynamic-card-panel.component';

describe('DynamicCardPanelComponent', () => {
  let component: DynamicCardPanelComponent;
  let fixture: ComponentFixture<DynamicCardPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicCardPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicCardPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
