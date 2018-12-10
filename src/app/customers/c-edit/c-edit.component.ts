import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as CustomerActions from '../store/c.actions';
import * as fromCustomer from '../store/c.reducers';
import { Observable } from 'rxjs';
import { Customer } from '../../shared/customer.model';

@Component({
  selector: 'app-c-edit',
  templateUrl: './c-edit.component.html',
  styleUrls: ['./c-edit.component.css']
})
export class CEditComponent implements OnInit {
  customerState: Observable<fromCustomer.State>;
  allCustomers: Customer[];
  listLength: number;
  id: number;
  editMode = false;
  customerForm: FormGroup;




  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromCustomer.FeatureState>) {
  }

  ngOnInit() {
    // Accepts the customers list length to give an ID for a new customer.
    this.customerState = this.store.select('customers');
    this.customerState.subscribe(res => {
      this.allCustomers = res.customers;
      this.listLength = this.allCustomers.length + 1;
    });
    console.log(this.listLength);

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = + params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new CustomerActions.UpdateCustomer({
        index: this.id,
        updatedCustomer: this.customerForm.value
      }));
      this.store.dispatch(new CustomerActions.StoreCustomers());
    } else {
      this.store.dispatch(new CustomerActions.AddCustomer(this.customerForm.value));
      this.store.dispatch(new CustomerActions.StoreCustomers());
    }
    this.onCancel();
  }

  onCancel() {
    console.log(this.store);
    this.router.navigate(['/customers/list'], { relativeTo: this.route });
  }

  private initForm() {
    let cId = this.id;
    if (!this.editMode) {
       cId = this.listLength;
    }
    let cName = '';
    let cBillable = false;



    if (this.editMode) {
      this.store.select('customers')
        .pipe(take(1))
        .subscribe((customerState: fromCustomer.State) => {
          const customer = customerState.customers[this.id];
          cId = this.id + 1;
          cName = customer.name;
          cBillable = customer.billable;

        });
    }

    this.customerForm = new FormGroup({
      'id': new FormControl(cId),
      'name': new FormControl(cName, Validators.required),
      'billable': new FormControl(cBillable),

    });
  }
}
