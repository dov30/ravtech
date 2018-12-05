import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PComponent } from './p.component';
import { PListComponent } from './p-list/p-list.component';
import { PEditComponent } from './p-edit/p-edit.component';
import { PItemComponent } from './p-list/p-item/p-item.component';
import { PRoutingModule } from './p-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PReducer } from './store/p.reducers';
import { PEffects } from './store/p.effects';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    PComponent,
    PListComponent,
    PEditComponent,
    PItemComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // HttpClientModule,
    PRoutingModule,
    SharedModule,
    StoreModule.forFeature('projects', PReducer),
    EffectsModule.forFeature([PEffects])
  ],
  exports: [
    PListComponent
  ]
})
export class ProjectModule {}
