import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/main-view').then((m) => m.BtMainView),
  },
];
