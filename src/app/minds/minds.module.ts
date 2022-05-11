import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MindsPageRoutingModule } from './minds-routing.module';

import { MindsPage } from './minds.page';

import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MindsPageRoutingModule,
    ScrollingModule
  ],
  declarations: [MindsPage]
})
export class MindsPageModule {}
