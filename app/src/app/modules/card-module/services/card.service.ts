import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CardModel } from '../models/card.model';
@Injectable({
  providedIn: 'root'
})
export class CardHttpService {
 private data: any[] = [];

  constructor() {
    this.generateInitialData();
  }

  private generateInitialData() {
    for (let i = 0; i < 5; i++) {
      this.data.push({
        id: faker.datatype.uuid(),
        content: faker.lorem.sentence()
      });
    }
  }

  getInitialData(): Observable<CardModel[]> {
    return of(this.data).pipe(delay(Math.random() * 1000));
  }

  addData(content: string = faker.lorem.sentence()): Observable<CardModel> {
    const newItem: CardModel = {
      id: faker.datatype.uuid(),
      content: content
    };
    this.data.push(newItem);
    return of(newItem).pipe(delay(Math.random() * 1000));
  }

  removeData(id: string): Observable<CardModel> {
    const remainingItems = this.data.filter(item => item.id !== id);
    this.data = remainingItems;
    return of({ id } as CardModel).pipe(delay(Math.random() * 1000));
  }
}
