import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AffiliationsRoutingModule } from './affiliations-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ConsultAffiliationsComponent } from './consult_affiliations/consultAffiliations.component';
import { AddAffiliateComponent } from './add_affiliate/addAffiliate.component';
import { AddBeneficiaryComponent } from './add_beneficiary/addBeneficiary.component';
import { AddUseComponent } from './add_use/addUse.component';

import { AllianceService } from '../alliances/services/alliance.service';
import { ProductService } from '../products/services/product.service';
import { AffiliateService } from './services/affiliate.service'
import { UseService } from './services/use.service';
import { AffiliationsService } from './services/affiliations.service';
import { BeneficiaryService } from './services/beneficiary.service';
import { ApiColsubsidioService } from './services/apiColsubsidio.service';

@NgModule({
    imports: [
        CommonModule,
        AffiliationsRoutingModule,
        SharedModule
    ],
    declarations: [
        ConsultAffiliationsComponent,
        AddAffiliateComponent,
        AddBeneficiaryComponent,
        AddUseComponent,
    ],
    providers: [
        AllianceService,
        ProductService,
        AffiliateService,
        UseService,
        AffiliateService,
        AffiliateService,
        BeneficiaryService,
        AffiliationsService,
        ApiColsubsidioService
    ]
})
export class AffiliationsModule {}
