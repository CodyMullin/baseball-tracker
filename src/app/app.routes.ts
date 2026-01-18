import { Routes } from '@angular/router';
import { BtMainView } from './views/main-view';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => BtMainView,
  },
];
