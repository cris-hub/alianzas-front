import { Directive, forwardRef, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl } from '@angular/forms';
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';

@Directive({
    selector: '[AppProductNameExist][ngModel]',
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: forwardRef(() => ProductNameDirective),
            multi: true
        }
    ]
})
export class ProductNameDirective {
    @Input() AppProductNameExist: string;
    constructor(
        private _aas: ApiAlliancesService,
    ) { }

    // validation function
    validate(c: AbstractControl): { [key: string]: any } {
        return new Promise(resolve => {
            this._aas.getProductByName(c.value, this.AppProductNameExist).subscribe(
                response => {
                    if (response != null) {
                        resolve({
                            AppProductNameExist: {
                                valid: false
                            }
                        });
                    } else {
                        resolve(null);
                    }
                },
                error => {
                    console.log("Error en la validación del usuario")
                }
            );
        })
    }
}