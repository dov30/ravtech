import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { EEditComponent } from './e/e-edit/e-edit.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AssignmentComponent } from './assignment/assignment.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'assignment', component: AssignmentComponent },
  { path: 'projects', loadChildren: './p/p.module#ProjectModule'},
  { path: 'employees', loadChildren: './e/e.module#EmployeeModule'},
  { path: 'customers', loadChildren: './c/c.module#CustomerModule'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
