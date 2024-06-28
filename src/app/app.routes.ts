import { Routes } from '@angular/router';
import { DisplayComponent } from './components/display/display.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: DisplayComponent,
  },
];
