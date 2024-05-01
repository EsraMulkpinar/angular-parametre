import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryService } from '../../services/query.service';
import { Table } from 'primeng/table';
import { TableColumn } from '../../models/table-col.model';
import { Attributes, Feature } from '../../models/all-data-response.model';


@Component({
  selector: 'app-query-search',
  templateUrl: './query-search.component.html',
  styleUrls: ['./query-search.component.css']
})
export class QuerySearchComponent implements OnInit {
  responses: Attributes[] = [];
  cols: TableColumn[];
  loading: boolean = false;
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
    this.loading = true;

    const queryParams = {
      outFields: '*',
      f: 'json',
      where: '1=1'  // İlk etapta tüm veriyi çekmek için
    };

    this.queryService.getFilteredResponses(queryParams).subscribe(
      data => {
        this.responses = data.features.map((feature: Feature) => feature.attributes );
        this.loading = false;

      },
      error => {
        console.error('Error fetching data: ', error);
        this.loading = false;

      }
    );
  }

  applyFilterGlobal(event: Event, filterMatchMode: string) {
    const value = (event.target as HTMLInputElement).value;
    this.table?.filterGlobal(value, filterMatchMode);
  }
  clearFilters() {
    this.table?.clear(); 
  }
}
