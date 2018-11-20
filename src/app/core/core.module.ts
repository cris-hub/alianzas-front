import { NgModule, Optional, SkipSelf } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SweetalertService } from './services/sweetalert.service';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about_us/aboutUs.component';

import { SessionService } from './services/session.service';
import { ApiAlliancesService } from './services/apiAlliances.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { RefreshJwtInterceptor } from './helpers/refreshJwt.interceptor';
import { Unauthorized } from './helpers/unauthorized.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { PrinterService } from './services/printer.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth.guard';
import { PasswordGuard } from './guards/password.guard';
import { UserService } from './services/user.service';
import { ChangePasswordComponent } from './change_password/changePassword.component';

@NgModule({
    imports: [
        CoreRoutingModule,
        SharedModule
    ],
    exports: [
        LoginComponent,
        AboutUsComponent,
        ChangePasswordComponent
    ],
    declarations: [
        LoginComponent,
        AboutUsComponent,
        ChangePasswordComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: Unauthorized, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: RefreshJwtInterceptor, multi: true },
        SweetalertService,
        SessionService,
        PrinterService,
        ApiAlliancesService,
        AuthenticationService,
        AuthGuard,
        PasswordGuard,
        UserService
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
