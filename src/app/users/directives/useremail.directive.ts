import { Directive, forwardRef, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl } from '@angular/forms';
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';

@Directive({
    selector: '[AppUserEmailExist][ngModel]',
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: forwardRef(() => UserEmailDirective),
            multi: true
        }
    ]
})
export class UserEmailDirective {
    @Input() AppUserEmailExist: string;
    constructor(
        private _aas: ApiAlliancesService,
    ) { }

    // validation function
    validate(c: AbstractControl): { [key: string]: any } {
        return new Promise(resolve => {
            this._aas.getUserByEmail(c.value, this.AppUserEmailExist).subscribe(
                response => {
                    if (response != null) {
                        resolve({
                            AppUserEmailExist: {
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