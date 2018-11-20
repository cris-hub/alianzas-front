import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about_us/aboutUs.component';
import { AuthGuard } from './guards/auth.guard';
import { ChangePasswordComponent } from './change_password/changePassword.component';
import { PasswordGuard } from './guards/password.guard';

export const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'nosotros',
                component: AboutUsComponent
            },
            {
                path: 'password',
                component: ChangePasswordComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'user',
                loadChildren: './user/user.module#UserModule',
            },
            {
                path: 'afiliaciones',
                loadChildren: '../affiliations/affiliations.module#AffiliationsModule',
                canActivate: [AuthGuard, PasswordGuard]
            },
            {
                path: 'reportes',
                loadChildren: '../reports/reports.module#ReportsModule',
                canActivate: [AuthGuard, PasswordGuard],
            },
            {
                path: 'usuarios',
                loadChildren: '../users/users.module#UsersModule',
                canActivate: [AuthGuard, PasswordGuard],
            },
            {
                path: 'alianzas',
                loadChildren: '../alliances/alliances.module#AlliancesModule',
                canActivate: [AuthGuard, PasswordGuard],
            },
            {
                path: 'productos',
                loadChildren: '../products/products.module#ProductsModule',
                canActivate: [AuthGuard, PasswordGuard],
            },
            {
                path: 'tipificacion',
                loadChildren: '../types/types.module#TypesModule',
                canActivate: [AuthGuard, PasswordGuard],
            },
            {
                path: 'convenios',
                loadChildren: '../agreements/agreements.module#AgreementsModule',
                canActivate: [AuthGuard, PasswordGuard],
            },
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }
