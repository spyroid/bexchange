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
    // this.date = '2018-11-14';
    // this.loadRates();
  }

  isDateValid(): boolean {
    let re = /^[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])$/
    return re.test(this.date);
  }

  loadRates() {
      console.log(this.date)
    if (this.date) {
      this.dataService.loadRates(this.date, this.base).subscribe(res => {
        this.rates = [];
        this.sorting = 0;
        for (let e in res.rates) {
            let f:boolean = this.getBases().includes(e);
            let v: number = +res.rates[e];
            let b: number = v / 100 * 5;
            let buy: number = v - b;
            let sell: number = v + b;
            this.rates.push(new Rate(e, buy.toFixed(4), sell.toFixed(4), f));
            // console.log(e, v)
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
  buy: string;
  sell: string;
  isBase: boolean;

  constructor(id: string, buy: string, sell: string, f: boolean) {
    this.id = id;
    this.buy = buy;
    this.sell = sell;
    this.isBase = f;
  }
}
