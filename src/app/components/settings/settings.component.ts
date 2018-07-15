import { Component, OnInit } from '@angular/core';
import {SettingService} from '../../services/setting.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Settings} from '../../models/setting';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: Settings;
  constructor(private settingService: SettingService,
              private router: Router,
              private fms: FlashMessagesService) { }

  ngOnInit() {
    this.settings = this.settingService.getSettings();
  }

  onSubmit() {
    this.settingService.changeSettings(this.settings);
    this.fms.show('Settings saved', {cssClass: 'alert-success', timeout: 4000});
    this.router.navigate(['/settings'])
  }

}
