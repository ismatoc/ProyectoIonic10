import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddlugarPageRoutingModule } from './addlugar-routing.module';

import { AddlugarPage } from './addlugar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddlugarPageRoutingModule
  ],
  declarations: [AddlugarPage]
})
export class AddlugarPageModule {}
