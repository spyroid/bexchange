import { Component } from '@angular/core';
import { DataService, RateResponse} from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bEchange';
  date: string;
  base: string;

  rates: Rate[] = null;
  sorting = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.base = this.getBases()[0];
    this.date = '2018-11-14';
    this.loadRates();
  }

  loadRates() {
    console.log(this.date);
    if (this.date) {
      this.dataService.loadRates(this.date, this.base).subscribe(res => {
        this.rates = [];
        this.sorting = 0;
        for (let e in res.rates) {
            let f:boolean = this.getBases().includes(e);
            this.rates.push(new Rate(e, +res.rates[e], f));
        }
      });
    }
  }

  sortRates() {
    if (this.sorting == 0) { this.sorting = 1; }
    this.rates.sort((a, b) => {
      if (a.id > b.id) {
        return this.sorting;
      } else if (a.id < b.id) {
        return -this.sorting;
      } else {
        return 0;
      }
    });
    this.sorting = -this.sorting;
  }

  getRates() {
      return this.rates;
  }

  getBases() {
    return ['EUR', 'USD', 'GBP', 'AUD', 'CAD', 'JPY']
  }
}

class Rate {
  id: string;
  value: number;
  isBase: boolean;

  constructor(id: string, value: number, f: boolean) {
    this.id = id;
    this.value = value;
    this.isBase = f;
  }
}
