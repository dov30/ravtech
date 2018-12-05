import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as EmployeeActions from '../store/e.actions';
import * as fromEmployee from '../store/e.reducers';
// import { Guarantor } from '../../shared/guarantor.model';

@Component({
  selector: 'app-e-edit',
  templateUrl: './e-edit.component.html',
  styleUrls: ['./e-edit.component.css']
})
export class EEditComponent implements OnInit {

  id: number;
  editMode = false;
  employeeForm: FormGroup;
  site = ['Jerusalem', 'Bnei Brak'];
  seniorityLevel = ['Intern', 'Junior', 'Senior'];


  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromEmployee.FeatureState>) {
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
      this.store.dispatch(new EmployeeActions.UpdateEmployee({
        index: this.id,
        updatedEmployee: this.employeeForm.value
      }));
      this.store.dispatch(new EmployeeActions.StoreEmployees());

    } else {
      this.store.dispatch(new EmployeeActions.AddEmployee(this.employeeForm.value));
      this.store.dispatch(new EmployeeActions.StoreEmployees());

    }
    this.onCancel();
  }


  onCancel() {
    this.router.navigate(['/employees/list'], { relativeTo: this.route });
  }

  private initForm() {
    let eId;
    let eName = '';
    let eSite = '';
    let eMainSkill = '';
    let eSeniorityLevel = '';
    let eLastAssignmentDate = '';


    if (this.editMode) {
      this.store.select('employees')
        .pipe(take(1))
        .subscribe((employeeState: fromEmployee.State) => {
          const employee = employeeState.employees[this.id];
          eId = employee.id;
          eName = employee.name;
          eSite = employee.site;
          eMainSkill = employee.mainSkill;
          eSeniorityLevel = employee.seniorityLevel;
          eLastAssignmentDate = employee.lastAssignmentDate;
        });
    }

    this.employeeForm = new FormGroup({
      'id': new FormControl(eId, Validators.required),
      'name': new FormControl(eName, Validators.required),
      'site': new FormControl(eSite, Validators.required),
      'mainSkill': new FormControl(eMainSkill, Validators.required),
      'seniorityLevel': new FormControl(eSeniorityLevel, Validators.required),
      'lastAssignmentDate': new FormControl(eLastAssignmentDate),

    });
  }
}
