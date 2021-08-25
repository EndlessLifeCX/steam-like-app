import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'steam',
    pathMatch: 'full'
  },
  {
    path: 'steam',
    loadChildren: () => import('./components/steam.module').then(m => m.SteamModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
