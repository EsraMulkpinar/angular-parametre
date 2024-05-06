import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterParams } from '../models/filters.model';
import { AllDataResponse } from '../models/all-data-response.model';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private baseUrl =
    'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0/query';

  constructor(private http: HttpClient) {}

  getFilteredResponses(filters: FilterParams): Observable<AllDataResponse> {
    const params = new HttpParams({ fromObject: filters });
    return this.http.get<AllDataResponse>(this.baseUrl, { params });
  }
}
