import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { EComponent } from './e.component';
import { EListComponent } from './e-list/e-list.component';
import { EEditComponent } from './e-edit/e-edit.component';
// import { EDetailComponent } from './e-detail/e-detail.component';
import { EItemComponent } from './e-list/e-item/e-item.component';
import { ERoutingModule } from './e-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EReducer } from './store/e.reducers';
import { EEffects } from './store/e.effects';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    EComponent,
    EListComponent,
    EEditComponent,
    // EDetailComponent,
    EItemComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // HttpClientModule,
    ERoutingModule,
    SharedModule,
    StoreModule.forFeature('employees', EReducer),
    EffectsModule.forFeature([EEffects])
  ],
  exports: [
    EListComponent
  ]
})
export class EmployeeModule {}
