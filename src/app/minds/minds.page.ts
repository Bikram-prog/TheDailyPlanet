import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from  '@angular/common/http';
import { ActionSheetController, IonRouterOutlet, IonTextarea, ModalController, NavController, ToastController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';

import { Router } from '@angular/router';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { SpinnerDialog } from '@awesome-cordova-plugins/spinner-dialog/ngx';

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
  public dataUrl: string = '';
  logId: string;

  @ViewChild("myInput") myInput: IonTextarea;

  constructor(private http: HttpClient, public routerOutlet: IonRouterOutlet,
    private actionSheetCtrl: ActionSheetController, public modalController: ModalController, private router: Router, private toast: ToastController, private spinnerDialog: SpinnerDialog, ) {

    }

  trackByMindsID(index: number, mind: any): string {
    return mind.news_id;
  }

  ngOnInit() {
    this.logId = localStorage.getItem('log_id');
    let url = "https://globallove.online/api/tdp/whatson/your/mind";
     this.http.get(url).subscribe((res: any) => {
      this.data = true;
      this.minds = res.data;

    });
  }

  ionViewWillEnter() {
    this.logId = localStorage.getItem('log_id');
    let url = "https://globallove.online/api/tdp/whatson/your/mind";
     this.http.get(url).subscribe((res: any) => {
      this.data = true;
      this.minds = res.data;

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


  async setPost() {
    this.spinnerDialog.show();
    const myheader = new HttpHeaders();
    //myheader.set('Access-Control-Allow-Origin', '*');
    myheader.set('Content-Type', 'application/x-www-form-urlencoded');

    const formData = new FormData();
    formData.append('name', 'Sumanta Kundu');
    formData.append('id', this.logId);
    formData.append('news_desc', this.post.text);
    formData.append('news_title', 'null');
    formData.append('image', this.dataUrl);

    await this.http.post<any>('https://globallove.online/api/tdp/news/insert', formData, {
      headers: myheader
    }).subscribe(response => {
      this.spinnerDialog.hide();
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
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      //source: CameraSource.Prompt,
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;

    // Can be set to the src of an image now
    this.dataUrl = image.base64String;

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
