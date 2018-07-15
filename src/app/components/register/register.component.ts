import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fms: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.register(this.email, this.password)
      .then(res => {
        this.fms.show('Yeni hesap oluşturuldu', {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.fms.show(err.message, {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/register']);
      });
  }

}
