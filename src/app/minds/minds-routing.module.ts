import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MindsPage } from './minds.page';

const routes: Routes = [
  {
    path: '',
    component: MindsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MindsPageRoutingModule {}
