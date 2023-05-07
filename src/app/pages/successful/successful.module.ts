import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuccessfulRoutingModule } from './successful-routing.module';
import { SuccessfulComponent } from './successful.component';
import {SearchModule} from "../search/search.module";


@NgModule({
  declarations: [
    SuccessfulComponent
  ],
  imports: [
    CommonModule,
    SuccessfulRoutingModule,
    SearchModule
  ]
})
export class SuccessfulModule { }
