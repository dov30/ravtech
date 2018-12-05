import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromCustomer from '../store/c.reducers';

@Component({
  selector: 'app-c-list',
  templateUrl: './c-list.component.html',
  styleUrls: ['./c-list.component.css']
})

export class CListComponent implements OnInit {
  customerState: Observable<fromCustomer.State>;
  // listLength;


  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromCustomer.FeatureState>) {
    }

    ngOnInit() {
      this.customerState = this.store.select('customers');
      // const listLength = this.store;
      // console.log('its my', listLength);

  }
}
