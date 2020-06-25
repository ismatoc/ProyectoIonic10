import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddlugarPage } from './addlugar.page';

const routes: Routes = [
  {
    path: '',
    component: AddlugarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddlugarPageRoutingModule {}
