import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {Client} from '../../models/client';
import {AngularFireDatabase} from 'angularfire2/database';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  totalAmount: number;
  constructor(private clientService: ClientService, private afd: AngularFireDatabase) { }

  ngOnInit() {
   /* this.clientService.getClients().valueChanges().subscribe(clients => {
      this.clients = clients as Client[];

      console.log(clients);
      console.log(this.totalAmount);
    }); */

    this.afd.list('clients').snapshotChanges().pipe(
      map(actions => {
        this.clients = actions.map(a => ({ $key: a.key, ...a.payload.val() })) as Client[];
        this.getTotal();
        return actions.map(a => ({ $key: a.key, ...a.payload.val() })) as Client[];
        }
      )
    ).subscribe(items => {
      return items.map(item => item.$key);
    });


  }

  getTotal() {
    this.totalAmount = 0;
    this.clients.forEach(client => { this.totalAmount += parseFloat(client.balance + '')});
  }


}
