import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {switchMap, withLatestFrom, map} from 'rxjs/operators';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';

import * as CustomerActions from '../store/c.actions';
import * as fromCustomer from '../store/c.reducers';
import { Customer } from '../../shared/customer.model';

@Injectable()
export class CEffects {
  @Effect()
  customerFetch = this.actions$
    .ofType(CustomerActions.FETCH_CUSTOMERS)
    .pipe(switchMap((action: CustomerActions.FetchCustomers) => {
      return this.httpClient.get<Customer[]>('customers.json', {
        observe: 'body',
        responseType: 'json'
      });
    }), map(
      (customers) => {
        console.log(customers);

        return {
          type: CustomerActions.SET_CUSTOMERS,
          payload: customers
        };
      }
    ));


  @Effect({dispatch: false})
  customerStore = this.actions$
    .ofType(CustomerActions.STORE_CUSTOMERS)
    .pipe(withLatestFrom(this.store.select('customers')),
      switchMap(([action, state]) => {
        const req = new HttpRequest('PUT', 'customers.json',
         state.customers, {reportProgress: true});

        return this.httpClient.request(req);
      }));

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromCustomer.FeatureState>) {
  }
}
