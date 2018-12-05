import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LayoutComponent } from '../layout/layout.component';
import { MainHeaderComponent } from '../layout/main-header/main-header.component';
import { MainContentComponent } from '../layout/main-content/main-content.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import { AllianceService } from '../alliances/services/alliance.service';
import { ProductService } from '../products/services/product.service';
import { MainNavComponent } from '../layout/main_nav/mainNav.component';
import { CompareValidatorModule } from 'angular-compare-validator';
import { MomentModule } from 'angular2-moment';
import { NumberOnlyDirective } from './directives/onlyNumber.directive';
import { RecaptchaModule } from 'angular-google-recaptcha';
import { AppConfig } from '../app.config';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

export function initConfig(config: AppConfig) {
    return () => config.load();
  }
  
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        AngularFontAwesomeModule,
        RouterModule,
        HttpClientModule,
        HttpModule,
        NgMultiSelectDropDownModule,
        CompareValidatorModule,
        MomentModule,
        RecaptchaModule.forRoot({
            siteKey: '6LdrdXIUAAAAAC1P0GWMYn32rHSdti0Z4nkp4Zu7',
        }),
    ],
    declarations: [
        LayoutComponent,
        MainHeaderComponent,
        MainContentComponent,
        MainNavComponent,
        NumberOnlyDirective
    ],
    exports: [
        CommonModule, 
        FormsModule,
        NgbModule,
        NgMultiSelectDropDownModule,
        LayoutComponent, 
        MainHeaderComponent, 
        MainContentComponent,
        MainNavComponent,
        CompareValidatorModule,
        MomentModule,
        RecaptchaModule
       
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AllianceService,
                ProductService,
                {provide: LocationStrategy, useClass: HashLocationStrategy},
                AppConfig,
                { 
                  provide: APP_INITIALIZER,
                  useFactory: initConfig,
                  deps: [AppConfig],
                  multi: true 
                }
            ]
        };
    }
}