import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'detalle/:id/:id2',
    loadChildren: () => import('./detalle/detalle.module').then( m => m.DetallePageModule)
  },
  {
    path: 'nuevo',
    loadChildren: () => import('./nuevo/nuevo.module').then( m => m.NuevoPageModule)
  },
  {
    path: 'lugares/:id',
    loadChildren: () => import('./lugares/lugares.module').then( m => m.LugaresPageModule)
  },
  {
    path: 'addlugar',
    loadChildren: () => import('./addlugar/addlugar.module').then( m => m.AddlugarPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
