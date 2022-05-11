import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoLoginPageRoutingModule } from './todo-login-routing.module';

import { TodoLoginPage } from './todo-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoLoginPageRoutingModule
  ],
  declarations: [TodoLoginPage]
})
export class TodoLoginPageModule {}
