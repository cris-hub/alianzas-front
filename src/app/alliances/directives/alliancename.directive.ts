import { Directive, forwardRef, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl } from '@angular/forms';
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';

@Directive({
    selector: '[AppAllianceNameExist][ngModel]',
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: forwardRef(() => AllianceNameDirective),
            multi: true
        }
    ]
})
export class AllianceNameDirective {
    @Input() AppAllianceNameExist: string;
    constructor(
        private _aas: ApiAlliancesService,
    ) { }

    // validation function
    validate(c: AbstractControl): { [key: string]: any } {
        return new Promise(resolve => {
            this._aas.getAllianceByName(c.value, this.AppAllianceNameExist).subscribe(
                response => {
                    if (response != null) {
                        resolve({
                            AppAllianceNameExist: {
                                valid: false
                            }
                        });
                    } else {
                        resolve(null);
                    }
                },
                error => {
                    console.log("Error en la validación de la alianza")
                }
            );
        })
    }
}