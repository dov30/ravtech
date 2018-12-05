import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as CustomerActions from '../store/c.actions';
import * as fromCustomer from '../store/c.reducers';
import { CEffects } from '../store/c.effects';

@Component({
  selector: 'app-c-edit',
  templateUrl: './c-edit.component.html',
  styleUrls: ['./c-edit.component.css']
})
export class CEditComponent implements OnInit {

  id: number;
  editMode = false;
  customerForm: FormGroup;




  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromCustomer.FeatureState>,
    private storeLength: CEffects) {
  }

  ngOnInit() {
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
    let cId;
    let cName = '';
    let cBillable = false;



    if (this.editMode) {
      this.store.select('customers')
        .pipe(take(1))
        .subscribe((customerState: fromCustomer.State) => {
          const customer = customerState.customers[this.id];
          cId = customer.id;
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
