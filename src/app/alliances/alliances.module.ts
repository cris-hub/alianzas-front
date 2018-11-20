import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlliancesRoutingModule } from './alliances-routing.module';
import { AddAllianceComponent } from './add_alliance/addAlliance.component';
import { SharedModule } from '../shared/shared.module';
import { AllianceService } from './services/alliance.service';
import { ListAlliancesComponent } from './list_alliances/listAlliances.component';
import { UpdateAllianceComponent } from './update_alliance/updateAlliance.component';
import { AllianceNameDirective } from './directives/alliancename.directive';

@NgModule({
  imports: [
    CommonModule,
    AlliancesRoutingModule,
    SharedModule
  ],
  declarations: [
    AddAllianceComponent,
    UpdateAllianceComponent,
    ListAlliancesComponent,
    AllianceNameDirective
  ],
  providers: [AllianceService]
})
export class AlliancesModule { }
