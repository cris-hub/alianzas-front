import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddProductComponent } from './add_product/addProduct.component';
import { UpdateProductComponent } from './update_product/updateProduct.component';
import { ListProductsComponent } from './list_products/listProducts.component';
import { AllianceProductsComponent } from './alliance_products/allianceProducts.component';
import { ProductNameDirective } from './directives/productname.directive';

import { ProductService } from './services/product.service'

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ],
  declarations: [
    AddProductComponent,
    UpdateProductComponent,
    ListProductsComponent,
    AllianceProductsComponent,
    ProductNameDirective
  ],
  providers: [ProductService]
})
export class ProductsModule { }
