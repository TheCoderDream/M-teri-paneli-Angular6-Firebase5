import { Injectable } from '@angular/core';
import { Settings } from '../models/setting';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  settings: Settings = {
  allowRegistration: true,
  disableBalanceOnAdd: true,
  disableBalanceOnEdit: true,
  };
  constructor() {
    if (localStorage.getItem('settings') != null) {
      this.settings = JSON.parse(localStorage.getItem('settings'))
    }
  }

  getSettings() {
    return this.settings;
  }
  changeSettings(settings: Settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
  }
}
