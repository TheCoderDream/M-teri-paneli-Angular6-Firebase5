import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {SettingService} from '../../services/setting.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIN: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(
    private router: Router,
    private auth: AuthService,
    private fms: FlashMessagesService,
    private setting: SettingService
  ) { }

  ngOnInit() {
    this.auth.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIN = true;
        this.loggedInUser = auth.email;

      } else {
        this.isLoggedIN = false;


      }
      this.showRegister = this.setting.getSettings().allowRegistration;
    });
  }

  onLogoutClick() {
    this.auth.logout();
    this.fms.show('Çıkış Yaptınız', {cssClass: 'alert-success', timeout: 4000});
    this.router.navigate(['/login']);
  }

}
