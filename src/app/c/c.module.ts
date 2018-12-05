import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CComponent } from './c.component';
import { CListComponent } from './c-list/c-list.component';
import { CEditComponent } from './c-edit/c-edit.component';
// import { CDetailComponent } from './c-detail/c-detail.component';
import { CItemComponent } from './c-list/c-item/c-item.component';
import { CRoutingModule } from './c-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CReducer } from './store/c.reducers';
import { CEffects } from './store/c.effects';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CComponent,
    CListComponent,
    CEditComponent,
    CItemComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // HttpClientModule,
    CRoutingModule,
    SharedModule,
    StoreModule.forFeature('customers', CReducer),
    EffectsModule.forFeature([CEffects])
  ],
  exports: [
    CListComponent
  ]
})
export class CustomerModule {}
