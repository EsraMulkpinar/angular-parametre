import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-dynamic-card-panel',
  templateUrl: './dynamic-card-panel.component.html',
  styleUrl: './dynamic-card-panel.component.css'
})
export class DynamicCardPanelComponent {
  @Input() headerTemplate?: TemplateRef<any>;
  @Input() footerTemplate?: TemplateRef<any>;
}
