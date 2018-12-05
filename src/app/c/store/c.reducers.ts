// import { PersonalInformation } from '../pi.model';
// import { Guarantor } from '../../shared/guarantor.model';
import * as CustomerActions from './c.actions';
import * as fromApp from '../../store/app.reducers';
import { Customer } from '../../shared/customer.model';

export interface FeatureState extends fromApp.AppState {
  customersStata: State;
}

export interface State {
  customers: Customer[];
}

const initialState: State = {
  customers: [
  ],
};

export function CReducer(state = initialState, action: CustomerActions.CustomerActions) {
  switch (action.type) {
    case (CustomerActions.SET_CUSTOMERS):
      return {
        ...state,
        customers: [...action.payload]
      };
    case (CustomerActions.ADD_CUSTOMER):
      return {
        ...state,
        customers: [...state.customers, action.payload]
      };

    case (CustomerActions.UPDATE_CUSTOMER):
      const customer = state.customers[action.payload.index];
      const updatedCustomer = {
        ...customer,
        ...action.payload.updatedCustomer
      };
      const customers = [...state.customers];
      customers[action.payload.index] = updatedCustomer;
      return {
        ...state,
        customers: customers
      };
    case (CustomerActions.DELETE_CUSTOMER):
      const oldCustomers = [...state.customers];
      oldCustomers.splice(action.payload, 1);
      return {
        ...state,
        customers: oldCustomers
      };
    default:
      return state;
  }
}
