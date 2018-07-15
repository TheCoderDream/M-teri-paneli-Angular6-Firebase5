import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { Observable} from 'rxjs';

import {Client} from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clients: AngularFireList<any[]>;
  client: AngularFireObject<Client>;
  constructor(private af: AngularFireDatabase) {
    this.clients = this.af.list('/clients') as AngularFireList<Client[]>;

  }

  getClients() {
    console.log(this.clients);
    return this.clients;
  }
  getClient(id: string) {
    this.client = this.af.object(`/clients/${id}`) as AngularFireObject<Client> ;

    return this.client;
  }

  addClient(client: Client) {
    this.clients.push(client as any);
  }

  updateClient(id: string, client: Client) {
    const $key = client.$key;
    delete client.$key;
    return this.clients.update(id, client as any);
  }
  deleteClient(id: string) {
    return this.clients.remove(id);
  }

}
