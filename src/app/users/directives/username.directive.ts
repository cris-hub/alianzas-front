import { Directive, forwardRef, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl } from '@angular/forms';
import { ApiAlliancesService } from '../../core/services/apiAlliances.service';

@Directive({
    selector: '[AppUsernameExist][ngModel]',
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: forwardRef(() => UsernameDirective),
            multi: true
        }
    ]
})
export class UsernameDirective {
    @Input() AppUsernameExist: string;
    constructor(
        private _aas: ApiAlliancesService,
    ) { }

    // validation function
    validate(c: AbstractControl) {
        return new Promise(resolve => {
            this._aas.getUserByUserName(c.value, this.AppUsernameExist).subscribe(
                response => {
                    if (response != null) {
                        resolve({
                            AppUsernameExist: {
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