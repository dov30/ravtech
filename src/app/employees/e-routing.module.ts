import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';
import { EEditComponent } from './e-edit/e-edit.component';
// import { EDetailComponent } from './e-detail/e-detail.component';
import { EComponent } from './e.component';
import { EListComponent } from './e-list/e-list.component';

const employeeRoutes: Routes = [
  { path: '',  children: [
    { path: 'list', component: EListComponent },
    { path: 'new', component: EEditComponent, canActivate: [AuthGuard] },
    // { path: 'list/:id', component: EDetailComponent, canActivate: [AuthGuard] },
    { path: 'list/:id/edit', component: EEditComponent, canActivate: [AuthGuard] },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(employeeRoutes)
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class ERoutingModule {}
