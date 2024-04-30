import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  private baseUrl = 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0/query';

  constructor(private http: HttpClient) { }

  getFilteredTrees(filters: any): Observable<any> {
    const params = new HttpParams({ fromObject: filters });
    return this.http.get(this.baseUrl, { params });
  }
  
}
