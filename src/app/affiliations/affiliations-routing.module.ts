import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultAffiliationsComponent } from './consult_affiliations/consultAffiliations.component';
import { AddBeneficiaryComponent } from './add_beneficiary/addBeneficiary.component';
import { AddAffiliateComponent } from './add_affiliate/addAffiliate.component';
import { AddUseComponent } from './add_use/addUse.component';

const routes: Routes = [
    {
        path: 'consulta-afiliado',
        component: ConsultAffiliationsComponent,
    },
    {
        path: 'agregar-afiliado',
        component: AddAffiliateComponent,
    },
    {
        path: 'agregar-beneficiario',
        component: AddBeneficiaryComponent,
    },
    {
        path: 'agregar-uso',
        component: AddUseComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AffiliationsRoutingModule { }
