import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';
import { CEditComponent } from './c-edit/c-edit.component';
import { CComponent } from './c.component';
import { CListComponent } from './c-list/c-list.component';

const customerRoutes: Routes = [
  { path: '',  children: [
    { path: 'list', component: CListComponent },
    { path: 'new', component: CEditComponent, canActivate: [AuthGuard] },
    { path: 'list/:id/edit', component: CEditComponent, canActivate: [AuthGuard] },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(customerRoutes)
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class CRoutingModule {}
