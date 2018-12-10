import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../../shared/customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromCustomer from '../../store/c.reducers';
import * as CustomerActions from '../../store/c.actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-c-item',
  templateUrl: './c-item.component.html',
  styleUrls: ['./c-item.component.css']
})
export class CItemComponent implements OnInit {
  @Input() customer: Customer;
  @Input() index: number;
  customerState: Observable<fromCustomer.State>;
  // id: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromCustomer.FeatureState>) {}

  ngOnInit() {
  }

  onEditCustomer() {
    this.router.navigate([this.index, 'edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteCustomer() {
    this.store.dispatch(new CustomerActions.DeleteCustomer(this.index));
    this.store.dispatch(new CustomerActions.StoreCustomers());
    this.router.navigate(['/customers/list']);
  }
}
