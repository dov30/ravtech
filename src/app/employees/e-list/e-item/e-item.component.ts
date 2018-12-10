import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../../../shared/employee.model';
import { ActivatedRoute, Router, Params } from '@angular/router';

import * as fromEmployee from '../../store/e.reducers';
import * as EmployeeActions from '../../store/e.actions';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-e-item',
  templateUrl: './e-item.component.html',
  styleUrls: ['./e-item.component.css']
})
export class EItemComponent implements OnInit {
  employeeState: Observable<fromEmployee.State>;
  // id: number;
  @Input() employee: Employee;
  @Input() index: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromEmployee.FeatureState>) {}

  ngOnInit() {
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.id = +params['id'];
    //       this.employeeState = this.store.select('employees');
    //     }
    //   );
  }

  onEditEmployee() {
    this.router.navigate([ this.index, 'edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteEmployee() {
    this.store.dispatch(new EmployeeActions.DeleteEmployee(this.index));
    this.store.dispatch(new EmployeeActions.StoreEmployees());
    this.router.navigate(['/employees/list']);
  }
}
