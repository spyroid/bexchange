import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { Observable } from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataService {

  constructor(private http: HttpClient) { }

  loadRates(date, base): Observable<RateResponse>  {
    let url = 'https://api.exchangeratesapi.io/' + date + '?base=' + base;
    return this.http.get<RateResponse>(url);
  }
}

export class RateResponse {
  rates: Object;
}