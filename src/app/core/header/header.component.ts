import { Component, OnInit } from '@angular/core';
// import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as EmployeeActions from '../../e/store/e.actions';
import * as ProjectActions from '../../p/store/p.actions';
import * as CustomerActions from '../../c/store/c.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onFetchEmployees() {
    this.store.dispatch(new EmployeeActions.FetchEmployees());
  }
  onFetchProjects() {
    this.store.dispatch(new ProjectActions.FetchProjects());
  }
  onFetchCustomers() {
    this.store.dispatch(new CustomerActions.FetchCustomers());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
