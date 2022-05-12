import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from  '@angular/common/http';
import { ActionSheetController, IonRouterOutlet, IonTextarea, ModalController, NavController, ToastController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';
// import { Camera, CameraResultType } from '@capacitor/camera';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

import { Router } from '@angular/router';

@Component({
  selector: 'app-minds',
  templateUrl: './minds.page.html',
  styleUrls: ['./minds.page.scss'],
})
export class MindsPage implements OnInit {

  minds: any = []
  public data: any = false;
  public openModal: boolean = false;
  public openModalDetails: boolean = false;
  public post = { text: ''}
  public dataUrl: any = '';

  @ViewChild("myInput") myInput: IonTextarea;

  constructor(private http: HttpClient, public routerOutlet: IonRouterOutlet,
    private actionSheetCtrl: ActionSheetController, public modalController: ModalController, private router: Router, private toast: ToastController, private camera: Camera  ) {

    }

  ngOnInit() {
    let url = "https://globallove.online/api/tdp/whatson/your/mind";
     this.http.get(url).subscribe((res: any) => {
      this.data = true;
      this.minds = res.data;
      console.log(res)
    });
  }

  async presentToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      color: 'success',
      duration: 3000
    });
    toast.present();
  }


  setPost() {
    
    const myheader = new HttpHeaders();
    //myheader.set('Access-Control-Allow-Origin', '*');
    myheader.set('Content-Type', 'application/x-www-form-urlencoded');

    let body = new HttpParams();
    // body = body.set('name', 'Sumanta Kundu');
    // body = body.set('id', '68');
    // body = body.set('news_desc', this.post.text);
    // body = body.set('news_title', 'demo title');
    body = body.set('image', this.dataUrl);

    this.http.post<any>('https://globallove.online/upload.php', body, {
      headers: myheader
    }).subscribe(response => {

      console.log(response.success)
      this.post.text = '';
      if(response.success == 'success') {
        this.presentToast("You'r post has been successfully posted.");
        this.dismiss();
        let url = "https://globallove.online/api/tdp/whatson/your/mind";
     this.http.get(url).subscribe((res: any) => {
      this.data = true;
      this.minds = res.data;
      console.log(res)
    });
      }


    });
  }

  async openCamera() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.dataUrl = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });

  }

   getMinds() {

  }

  startModal() {
    this.openModal = true;
    //alert("ionViewDidLoad");
    setTimeout(() => {
      this.myInput.setFocus();
    }, 1000);
  }

  async canDismiss() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure you want to discard your changes?',
      buttons: [
        {
          text: 'Discard Changes',
          role: 'destructive'
        },
        {
          text: 'Keep Editing',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();

    if (role === 'destructive') {
      this.dismiss();
    }

    return false;
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
    this.openModal = false;
  }

  async gotoDetails(id) {
    this.router.navigate(['details/' + id])
    // const modal = await this.modalController.create({
    //   initialBreakpoint: 1,
    //   component: DetailsPage,
    //   cssClass: 'my-custom-class',
    //   swipeToClose: false,
    //   presentingElement: this.routerOutlet.nativeEl,
    //   componentProps: {
    //     'id': id,
    //   }
    // });
    // return await modal.present();
  }

}