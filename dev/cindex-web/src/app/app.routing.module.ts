import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./modules/users/users.module').then(m => m.UserModule)
  },
  {
    path: 'rooms',
    loadChildren: () => import('./modules/rooms/rooms.module').then(m => m.RoomsModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
