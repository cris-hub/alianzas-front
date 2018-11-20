import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypesRoutingModule } from './types-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddTypeComponent } from './add_type/addType.component';
import { UpdateTypeComponent } from './update_type/updateType.component';
import { ListTypesComponent } from './list_types/listTypes.component';
import { TypeService } from './services/type.service';

@NgModule({
  imports: [
    CommonModule,
    TypesRoutingModule,
    SharedModule
  ],
  declarations: [
    AddTypeComponent,
    UpdateTypeComponent,
    ListTypesComponent
  ],
  providers: [TypeService]
})
export class TypesModule { }
