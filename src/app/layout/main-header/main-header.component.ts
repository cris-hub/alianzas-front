import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../core/services/session.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../shared/models/user';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'gp-main-header',
  templateUrl: './main-header.component.html'
})
export class MainHeaderComponent implements OnInit {
  public user: User
  public session: SessionService;
  constructor(
    public _ss: SessionService,
    public _us: UserService,
  ) { }

  ngOnInit() {
    this.user = this._ss.getCurrentUser();
    if (!this.user) {
      this.user = this._us.newUser();
    }
  }

  /**
  * @desc switch SideBar
  */
  public switchSideBar() {
    $('.sidebar').toggle();
  }

  /**
  * @desc logout session
  */
  public logout(): void {
    this._ss.logout();
  }

}
