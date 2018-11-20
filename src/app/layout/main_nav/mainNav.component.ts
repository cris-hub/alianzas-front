import { Component } from '@angular/core';
import { SessionService } from '../../core/services/session.service';
import { User } from '../../shared/models/user';
import { UserService } from '../../core/services/user.service';

declare var jQuery: any;
declare var $: any;

@Component({
    selector: 'gp-main-nav',
    templateUrl: './mainNav.component.html'
})

export class MainNavComponent {
    public user: User;

    constructor(
        public _ss: SessionService,
        public _us: UserService,
    ) {
        this.user = this._ss.newUser();
    }

    ngOnInit() {

    }

    /**
     * @desc switch SideBar
     */
    public switchSideBar() {
        $('.sidebar').toggle();
    }

    ngAfterContentChecked() {
        this.user = this._ss.getCurrentUser();
        if (!this.user) {
            this.user = this._us.newUser();
        }

    }
}