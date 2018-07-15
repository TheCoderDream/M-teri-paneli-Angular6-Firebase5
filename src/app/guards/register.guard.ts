import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SettingService} from '../services/setting.service';

@Injectable()
export class RegisterGuard implements CanActivate {
  constructor(
    private router: Router,
    private setting: SettingService
  ) {}

  canActivate(): boolean {
    if (this.setting.getSettings().allowRegistration) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
