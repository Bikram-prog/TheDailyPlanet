import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { RestService } from '../rest.service';
import { SpinnerDialog } from '@awesome-cordova-plugins/spinner-dialog/ngx';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public log = { name: '', email: '', pass: '', repass: ''};

  constructor(private router: Router, private navctrl: NavController, public restService: RestService, public alertController: AlertController, private spinnerDialog: SpinnerDialog) { }

  ngOnInit() {
    this.spinnerDialog.hide();
  }

  async signup() {
    this.spinnerDialog.show('', 'Creating your account...', true);
    await this.restService.signup(this.log.name, this.log.email, this.log.pass, this.log.repass).subscribe(
      (response) => {
        if(response) {
          this.spinnerDialog.hide();
          this.navctrl.navigateRoot("todo-login");
        } else {
          this.spinnerDialog.hide();
          localStorage.removeItem('log_id');
          this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Error!',
            //subHeader: 'Subtitle',
            message: 'Something is wrong. Please try again later.',
            buttons: ['Got it']
          }).then(res => res.present());
        }

       },
      (error) => {
        this.spinnerDialog.hide();
        localStorage.removeItem('log_id');
        alert("Error! Something is not right.")
       });


  }

  login() {
    this.navctrl.navigateForward('todo-login')
  }

}
