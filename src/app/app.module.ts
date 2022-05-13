import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SpinnerDialog } from '@awesome-cordova-plugins/spinner-dialog/ngx';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({
    rippleEffect: true,
      //mode: 'md'
  }), AppRoutingModule, HttpClientModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    InAppBrowser, SpinnerDialog, PhotoViewer],
  bootstrap: [AppComponent],
})
export class AppModule {}
