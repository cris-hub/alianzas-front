import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAllianceComponent } from "./add_alliance/addAlliance.component";
import {ListAlliancesComponent} from "./list_alliances/listAlliances.component"
import { UpdateAllianceComponent } from './update_alliance/updateAlliance.component';

const routes: Routes = [
  {
    path: 'agregar',
    component: AddAllianceComponent
  },
  {
    path: 'actualizar/:id',
    component: UpdateAllianceComponent
  },
  {
    path: 'listar',
    component: ListAlliancesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlliancesRoutingModule { }
