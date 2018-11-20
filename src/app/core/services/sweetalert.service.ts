import { Injectable } from '@angular/core';

declare var swal: any;

@Injectable()
export class SweetalertService {
    public downdloadAlert(message: string = 'Cargando información') {
        swal({
            title: 'Un momento por favor',
            text: message,
            onOpen: () => {
                swal.showLoading()
            },
            allowOutsideClick: false
        })
    }

    public errorAlert(message: string = 'Error cargando la información') {
        swal(
            'Se ha presentado un error',
            message,
            'error'
        )
    }

    public successAlert(message: string = 'Proceso realizado exitosamente') {
        swal(
            'Perfecto!',
            message,
            'success'
        )
    }

    public warningAlert(message: string = '') {
        swal(
            'Atención!',
            message,
            'warning'
        )
    }

    public closeAlert() {
        swal.close()
    }

}