import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: "What's on your mind", url: '/minds', icon: 'newspaper' },
    { title: 'My Profile', url: '/profile', icon: 'person-circle' },
    // { title: 'Open', url: '/folder/open', icon: 'list' },
    // { title: 'In-progress', url: '/folder/In-progress', icon: 'hourglass' },
    // { title: 'Completed', url: '/folder/completed', icon: 'checkmark-done' }
  ];
  public labels = ['Privacy', 'Terms'];
  log_name: string;

  constructor(private router: Router, private platform: Platform, public navctrl: NavController, private statusBar: StatusBar) {
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {

      // let status bar overlay webview
      this.statusBar.overlaysWebView(false);

      // set status bar to white
      this.statusBar.backgroundColorByHexString('#6370ff');

      const log_id = localStorage.getItem('log_id');
      this.log_name = localStorage.getItem('log_name');
      if(log_id) {
        this.navctrl.navigateRoot("");
      } else {
        this.router.navigate(['todo-login']);
      }
    })



  }

  async logout() {
    await localStorage.removeItem('log_id');
    this.navctrl.navigateRoot('todo-login')
  }
}
