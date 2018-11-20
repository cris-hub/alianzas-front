import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgreementsRoutingModule } from './agreements-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddAgreementComponent } from './add_agreement/addAgreement.component';
import { UpdateAgreementComponent } from './update_agreement/updateAgreement.component';
import { ListAgreementsComponent } from './list_agreements/listAgreements.component';
import { AgreementService } from './services/agreement.service';

@NgModule({
  imports: [
    CommonModule,
    AgreementsRoutingModule,
    SharedModule
  ],
  declarations: [
    AddAgreementComponent,
    UpdateAgreementComponent,
    ListAgreementsComponent
  ],
  providers: [AgreementService]
})
export class AgreementsModule { }
