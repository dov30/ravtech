import { Action } from '@ngrx/store';
import { Customer } from '../../shared/customer.model';

// import { Customer } from '../../shared/Customer.model';


export const SET_CUSTOMERS = 'SET_CUSTOMERS';
export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';
export const STORE_CUSTOMERS = 'STORE_CUSTOMERS';
export const FETCH_CUSTOMERS = 'FETCH_CUSTOMERS';

export class SetCustomers implements Action {
  readonly type = SET_CUSTOMERS;

  constructor(public payload: Customer[]) {}
}

export class AddCustomer implements Action {
  readonly type = ADD_CUSTOMER;

  constructor(public payload: Customer) {}
}

export class UpdateCustomer implements Action {
  readonly type = UPDATE_CUSTOMER;

  constructor(public payload: {index: number, updatedCustomer: Customer}) {}
}

export class DeleteCustomer implements Action {
  readonly type = DELETE_CUSTOMER;

  constructor(public payload: number) {}
}

export class StoreCustomers implements Action {
  readonly type = STORE_CUSTOMERS;
}

export class FetchCustomers implements Action {
  readonly type = FETCH_CUSTOMERS;
}

export type CustomerActions = SetCustomers |
  AddCustomer |
  UpdateCustomer |
  DeleteCustomer |
  StoreCustomers |
  FetchCustomers;
