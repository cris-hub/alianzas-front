import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAgreementComponent } from './add_agreement/addAgreement.component';
import { UpdateAgreementComponent } from './update_agreement/updateAgreement.component';
import { ListAgreementsComponent } from './list_agreements/listAgreements.component';

const routes: Routes = [
  {
    path: 'agregar', 
    component: AddAgreementComponent
  },
  {
    path: 'actualizar/:id', 
    component: UpdateAgreementComponent
  },
  {
    path: 'listar',
    component: ListAgreementsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgreementsRoutingModule { }
