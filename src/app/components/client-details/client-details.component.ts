import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ActivatedRoute, Router} from '@angular/router';
import {Client} from '../../models/client';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: any;
  client: Client;
  hasBalance = false;
  showBalanceUpdateInput = false;

  constructor(
    private srv: ClientService,
    private fms: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
     this.srv.getClient(this.id).snapshotChanges().subscribe(client => {
       this.client = {$key: client.key, ...client.payload.val()};
       console.log(this.client.$key);
       if (this.client.balance > 0) {
         this.hasBalance = true;
       }
     });



   /* this.afDb.list(`/clients/${this.id}`).snapshotChanges().pipe(
      map(actions => {
          this.client = actions.map(a => ({$key: a.key, ...a.payload.val()})) as Client;
          console.log(this.client);
        return actions.map(a => ({ $key: a.key, ...a.payload.val() })) as Client;
      }
      )
    ); */
  }

  updateBalance(id: any) {
    this.srv.updateClient(id, this.client);
    this.fms.show('Bakiye güncellendi!', {cssClass: 'alert-success', timeout: 4000});
    this.router.navigate(['/client', this.client.$key]);
  }
  onDeleteClick() {
    if (confirm('Silmek istediginize eminmiziniz?') ) {
      this.srv.deleteClient(this.id);
      this.fms.show('Müşteri silindi', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/client', this.client.$key]);
    }
  }
}
