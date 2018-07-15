import {Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {AddClientComponent} from './components/add-client/add-client.component';
import {ClientDetailsComponent} from './components/client-details/client-details.component';
import {EditClientComponent} from './components/edit-client/edit-client.component';
import {AuthGuards} from './guards/auth.guards';
import {RegisterGuard} from './guards/register.guard';
import {SettingsComponent} from './components/settings/settings.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';


export const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuards]},
  {path: 'register', component: RegisterComponent, canActivate: [RegisterGuard]},
  {path: 'login', component: LoginComponent },
  {path: 'add-client', component: AddClientComponent, canActivate: [AuthGuards]},
  {path: 'client/:id', component: ClientDetailsComponent, canActivate: [AuthGuards]},
  {path: 'edit-client/:id', component: EditClientComponent, canActivate: [AuthGuards]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuards]},
  {path: '**', component: PageNotFoundComponent}
];
