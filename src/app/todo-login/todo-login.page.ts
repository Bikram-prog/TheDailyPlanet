import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { RestService } from '../rest.service';
import { HttpClient, HttpHeaders, HttpParams } from  '@angular/common/http';

@Component({
  selector: 'app-todo-login',
  templateUrl: './todo-login.page.html',
  styleUrls: ['./todo-login.page.scss'],
})
export class TodoLoginPage implements OnInit {

  public log = { email: '', pass: ''};

  constructor(private router: Router, private navctrl: NavController, public restService: RestService, public alertController: AlertController, private http: HttpClient ) { }

  ngOnInit() {
  }

  async login() {
    const myheader = new HttpHeaders();
    //myheader.set('Access-Control-Allow-Origin', '*');
    myheader.set('Content-Type', 'application/x-www-form-urlencoded');

    let body = new HttpParams();
    body = body.set('mail', this.log.email);
    body = body.set('psw', this.log.pass);

    this.http.post<any>('https://globallove.online/api/tdp/login', body, {
      headers: myheader
    }).subscribe(response => {
console.log(response['name'])
      if(response.id > 0) {
        localStorage.setItem('log_id', response['id']);
        localStorage.setItem('log_name', response['name']);
        localStorage.setItem('log_email', response['email']);
        this.navctrl.navigateRoot("");
      } else {
        localStorage.removeItem('log_id');
        this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Error!',
          //subHeader: 'Subtitle',
          message: 'Please check your email or password.',
          buttons: ['Got it']
        }).then(res => res.present());
      }

    });


  }

  register() {
    this.navctrl.navigateForward('signup')
  }

}
