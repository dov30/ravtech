import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Employee } from '../../shared/employee.model';
// import { ReactiveFormsModule } from '@angular/forms';

import * as fromEmployee from '../store/e.reducers';

@Component({
  selector: 'app-e-list',
  templateUrl: './e-list.component.html',
  styleUrls: ['./e-list.component.css']
})

export class EListComponent implements OnInit {
  employeeState: Observable<fromEmployee.State>;
  allEmployees: Employee[];
  employeeList: Employee[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromEmployee.FeatureState>) {
  }

  ngOnInit() {
    this.employeeState = this.store.select('employees');
    this.employeeState.subscribe(res => {
      this.allEmployees = res.employees;
      this.employeeList = res.employees;
    });
  }

  onSearch(value) {
    this.employeeList = this.filter(value);
  }

  filter(value: string): Employee[] {
    return this.allEmployees.filter(emp => {
      return emp.name.toLocaleLowerCase().startsWith(value.toLowerCase());
    });
  }


}
