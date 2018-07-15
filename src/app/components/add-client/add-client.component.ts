import { Component, OnInit } from '@angular/core';
import {Client} from '../../models/client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {ClientService} from '../../services/client.service';
import {SettingService} from '../../services/setting.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  disableBalanceOnAdd = false;
  constructor(
    private fms: FlashMessagesService,
    private router: Router,
    private srv: ClientService,
    private setting: SettingService
    ) { }

  ngOnInit() {

    this.disableBalanceOnAdd = this.setting.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value, valid }: {value: Client, valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if(!valid) {
      this.fms.show('Lütfen Tüm alanları doldurunuz', {cssClass: 'alert-danger', timeout: 4000});
      this.router.navigate(['add-client']);
    } else {
      this.srv.addClient(value);
      this.fms.show('Yeni müşteri eklendi', {cssClass: 'alert-danger', timeout: 4000});


    }
  }



}
