// import { PersonalInformation } from '../pi.model';
// import { Guarantor } from '../../shared/guarantor.model';
import * as EmployeeActions from './e.actions';
import * as fromApp from '../../store/app.reducers';
import { Employee } from '../../shared/employee.model';

export interface FeatureState extends fromApp.AppState {
  employeesStata: State;
}

export interface State {
  employees: Employee[];
}

const initialState: State = {
  employees: [
  ]
};

export function EReducer(state = initialState, action: EmployeeActions.EmployeeActions) {
  switch (action.type) {
    case (EmployeeActions.SET_EMPLOYEES):
      return {
        ...state,
        employees: [...action.payload]
      };
    case (EmployeeActions.ADD_EMPLOYEE):
      return {
        ...state,
        employees: [...state.employees, action.payload]
      };
    case (EmployeeActions.UPDATE_EMPLOYEE):
      const employee = state.employees[action.payload.index];
      const updatedEmployee = {
        ...employee,
        ...action.payload.updatedEmployee
      };
      const employees = [...state.employees];
      employees[action.payload.index] = updatedEmployee;
      return {
        ...state,
        employees: employees
      };
    case (EmployeeActions.DELETE_EMPLOYEE):
      const oldEmployees = [...state.employees];
      oldEmployees.splice(action.payload, 1);
      return {
        ...state,
        employees: oldEmployees
      };
    default:
      return state;
  }
}
