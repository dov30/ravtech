import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {switchMap, withLatestFrom, map} from 'rxjs/operators';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';

import * as EmployeeActions from '../store/e.actions';
import * as fromEmployee from '../store/e.reducers';
import { Employee } from '../../shared/employee.model';

@Injectable()
export class EEffects {
  @Effect()
  employeeFetch = this.actions$
    .ofType(EmployeeActions.FETCH_EMPLOYEES)
    .pipe(switchMap((action: EmployeeActions.FetchEmployees) => {
      return this.httpClient.get<Employee[]>('employees.json', {
        observe: 'body',
        responseType: 'json'
      });
    }), map(
      (employees) => {
        console.log(employees);
        return {
          type: EmployeeActions.SET_EMPLOYEES,
          payload: employees
        };
      }
    ));

  @Effect({dispatch: false})
  recipeStore = this.actions$
    .ofType(EmployeeActions.STORE_EMPLOYEES)
    .pipe(withLatestFrom(this.store.select('employees')),
      switchMap(([action, state]) => {
        const req = new HttpRequest('PUT', 'employees.json',
         state.employees, {reportProgress: true});
        return this.httpClient.request(req);
      }));

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromEmployee.FeatureState>) {
  }
}
