import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ActivatedRoute, Router} from '@angular/router';
import {Client} from '../../models/client';
import {s} from '@angular/core/src/render3';
import {SettingService} from '../../services/setting.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnEdit = true;
  constructor(
    private srv: ClientService,
    private fms: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private setting: SettingService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.srv.getClient(this.id).snapshotChanges().subscribe(client => {
      this.client = {$key: client.key, ...client.payload.val()};
    });

    this.disableBalanceOnEdit = this.setting.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value, valid }: {value: Client, valid: boolean }) {

    if (!valid) {
      this.fms.show('Lütfen Tüm alanları doldurunuz', {cssClass: 'alert-danger', timeout: 4000});
      this.router.navigate(['edit-client', this.id]);
    } else {

      this.srv.updateClient(this.id, value);
      this.fms.show('Bilgiler güncellendi', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/client', this.id]);


    }
  }

}
