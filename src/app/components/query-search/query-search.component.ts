import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryService } from '../../services/query.service';
import { Table } from 'primeng/table';

interface Tree {
  Tree_ID: number;
  Cmn_Name: string;
  Sci_Name: string;
  Height: number;
  Condition: string;
}

@Component({
  selector: 'app-query-search',
  templateUrl: './query-search.component.html',
  styleUrls: ['./query-search.component.css']
})
export class QuerySearchComponent implements OnInit {
  trees: Tree[] = [];
  cols: any[];

  @ViewChild('table') table: Table | undefined;

  constructor(private queryService: QueryService) {
    this.cols = [
      { field: 'Tree_ID', header: 'Tree ID', filterMatchMode: 'equals' },
      { field: 'Cmn_Name', header: 'Common Name', filterMatchMode: 'contains' },
      { field: 'Sci_Name', header: 'Scientific Name', filterMatchMode: 'contains' },
      { field: 'Height', header: 'Height', filterMatchMode: 'equals' },
      { field: 'Condition', header: 'Condition', filterMatchMode: 'contains' }
    ];
  }

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    const queryParams = {
      outFields: '*',
      f: 'json',
      where: '1=1'  // İlk etapta tüm veriyi çekmek için
    };

    this.queryService.getFilteredTrees(queryParams).subscribe(
      data => {
        this.trees = data.features.map((feature: { attributes: Tree; }) => feature.attributes as Tree);
      },
      error => {
        console.error('Error fetching data: ', error);
      }
    );
  }

  applyFilterGlobal(event: Event, filterMatchMode: string) {
    const value = (event.target as HTMLInputElement).value;
    this.table?.filterGlobal(value, filterMatchMode);
  }
  clearFilters() {
    this.table?.clear(); // Tablodaki tüm filtreleri temizler.
  }
}
