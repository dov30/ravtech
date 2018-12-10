import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { EEditComponent } from './employees/e-edit/e-edit.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AssignmentComponent } from './assignment/assignment.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'assignment', component: AssignmentComponent },
  { path: 'projects', loadChildren: './projects/p.module#ProjectModule'},
  { path: 'employees', loadChildren: './employees/e.module#EmployeeModule'},
  { path: 'customers', loadChildren: './customers/c.module#CustomerModule'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
