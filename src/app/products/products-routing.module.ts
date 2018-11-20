import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProductComponent } from "./add_product/addProduct.component";
import { ListProductsComponent } from './list_products/listProducts.component';
import { UpdateProductComponent } from './update_product/updateProduct.component';
import { AllianceProductsComponent } from './alliance_products/allianceProducts.component';

const routes: Routes = [
  {
    path: 'agregar', 
    component: AddProductComponent
  },
  {
    path: 'actualizar/:id', 
    component: UpdateProductComponent
  },
  {
    path: 'listar',
    component: ListProductsComponent
  },
  {
    path: 'alianzas/alianza/:id',
    component: AllianceProductsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
