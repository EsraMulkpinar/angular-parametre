import { Component, OnInit } from '@angular/core';
import { QueryService } from '../../services/query.service';

interface Tree {
  Tree_ID: number;
  Collected: string;
  Crew: string;
  Status: string;
  Spp_Code: string;
  Height: number;
  Crown_Height: number;
  Leaf_Area: number;
  Leaf_Bmass: number;
  Longitude: number;
  Latitude: number;
}

@Component({
  selector: 'app-query-search',
  templateUrl: './query-search.component.html',
  styleUrls: ['./query-search.component.css']
})
export class QuerySearchComponent implements OnInit {
  trees: Tree[] = [];
  cols: any[] = [];

  constructor(private queryService: QueryService) {}

  ngOnInit() {
    this.cols = [
      { field: 'Tree_ID', header: 'ID' },
      { field: 'Collected', header: 'Collection Date' },
      { field: 'Crew', header: 'Crew' },
      { field: 'Status', header: 'Status' },
      { field: 'Spp_Code', header: 'Species Code' },
      { field: 'Height', header: 'Height (ft)' },
      { field: 'Crown_Height', header: 'Crown Height (ft)' },
      { field: 'Leaf_Area', header: 'Leaf Area' },
      { field: 'Leaf_Bmass', header: 'Leaf Biomass' },
      { field: 'Longitude', header: 'Longitude' },
      { field: 'Latitude', header: 'Latitude' }
    ];

    this.loadInitialData();
  }

  loadInitialData() {
    const queryParams = {
      outFields: '*',
      f: 'json',
      where: '1=1'  // Always true condition
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
}
