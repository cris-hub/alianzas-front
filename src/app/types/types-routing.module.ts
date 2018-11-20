import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTypeComponent } from './add_type/addType.component';
import { UpdateTypeComponent } from './update_type/updateType.component';
import { ListTypesComponent } from './list_types/listTypes.component';

const routes: Routes = [
  {
    path: 'agregar', 
    component: AddTypeComponent
  },
  {
    path: 'actualizar/:id', 
    component: UpdateTypeComponent
  },
  {
    path: 'listar',
    component: ListTypesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypesRoutingModule { }
