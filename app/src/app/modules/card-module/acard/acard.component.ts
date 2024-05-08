import { Component, OnInit } from '@angular/core';
import { CardHttpService } from '../services/card.service';
import { CardModel } from '../models/card.model';

@Component({
  selector: 'app-acard',
  templateUrl: './acard.component.html',
  styleUrl: './acard.component.css'
})
export class ACardComponent implements OnInit {
  data: any[] = [];

  constructor(private cardHttpService: CardHttpService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.cardHttpService.getInitialData().subscribe(data => {
      this.data = data;
      console.log(data);
      
    });
  }

  addData(): void {
    this.cardHttpService.addData().subscribe(item => {
      this.data.push(item);
    });
  }

  removeData(id: string): void {
    this.cardHttpService.removeData(id).subscribe(() => {
      this.data = this.data.filter(item => item.id !== id);
    });
  }
}