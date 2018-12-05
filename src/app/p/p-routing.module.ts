import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';
import { PEditComponent } from './p-edit/p-edit.component';
// import { PDetailComponent } from './p-detail/p-detail.component';
import { PComponent } from './p.component';
import { PListComponent } from './p-list/p-list.component';

const projectRoutes: Routes = [
  { path: '',  children: [
    { path: 'list', component: PListComponent },
    { path: 'new', component: PEditComponent, canActivate: [AuthGuard] },
    // { path: 'list/:id', component: PDetailComponent, canActivate: [AuthGuard] },
    { path: 'list/:id/edit', component: PEditComponent, canActivate: [AuthGuard] },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(projectRoutes)
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class PRoutingModule {}
