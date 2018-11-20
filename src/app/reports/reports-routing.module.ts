import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportUsesComponent } from './report_uses/reportUses.component';

const routes: Routes = [
    {
        path: 'usos',
        component: ReportUsesComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
