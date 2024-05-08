import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private selectedFeature = new BehaviorSubject<number | null>(null);

  setSelectedFeature(id: number | null) {
    this.selectedFeature.next(id);
  }

  getSelectedFeature() {
    return this.selectedFeature.asObservable();
  }
}
