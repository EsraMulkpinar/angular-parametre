import { Component, OnInit } from '@angular/core';
import { CardHttpService } from '../services/card.service';

@Component({
  selector: 'app-ccard',
  templateUrl: './ccard.component.html',
  styleUrl: './ccard.component.css'
})
export class CCardComponent implements OnInit{


  data: any[] = [];

  constructor(private cardHttpService: CardHttpService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.cardHttpService.getInitialData().subscribe(data => {
      this.data = data;
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
