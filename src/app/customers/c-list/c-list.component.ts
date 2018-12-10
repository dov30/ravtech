import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromCustomer from '../store/c.reducers';
import { Customer } from '../../shared/customer.model';

@Component({
  selector: 'app-c-list',
  templateUrl: './c-list.component.html',
  styleUrls: ['./c-list.component.css']
})

export class CListComponent implements OnInit {
  customerState: Observable<fromCustomer.State>;
  allCustomers: Customer[];
  customerList: Customer[];


  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromCustomer.FeatureState>) {
    }

    ngOnInit() {
      this.customerState = this.store.select('customers');
      this.customerState.subscribe(res => {
        this.allCustomers = res.customers;
        this.customerList = res.customers;
      });
  }

  onSearch(value) {
    this.customerList = this.filter(value);
  }

  filter(value: string): Customer[] {
    return this.allCustomers.filter(cus => {
      return cus.name.toLocaleLowerCase().startsWith(value.toLowerCase());
    });
  }
}
