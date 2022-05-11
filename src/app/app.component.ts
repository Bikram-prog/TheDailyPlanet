import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'News', url: '/folder/news', icon: 'newspaper' },
    { title: "What's on your mind", url: '/minds', icon: 'list' },
    // { title: 'Open', url: '/folder/open', icon: 'list' },
    // { title: 'In-progress', url: '/folder/In-progress', icon: 'hourglass' },
    // { title: 'Completed', url: '/folder/completed', icon: 'checkmark-done' }
  ];
  public labels = ['Privacy', 'Terms'];
  constructor(private router: Router, private platform: Platform, public navctrl: NavController) {
    this.initializeApp();
  }

  initializeApp() {

      const log_id = localStorage.getItem('log_id');
      if(log_id) {
        this.navctrl.navigateRoot("");
      } else {
        this.router.navigate(['todo-login']);
      }


  }

  async logout() {
    await localStorage.removeItem('log_id');
    this.navctrl.navigateRoot('todo-login')
  }
}
