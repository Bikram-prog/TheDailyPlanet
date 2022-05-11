import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from  '@angular/common/http';
import { ActionSheetController, IonRouterOutlet, IonTextarea, ModalController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';
import { Camera, CameraResultType } from '@capacitor/camera';


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

  @ViewChild("myInput") myInput: IonTextarea;

  constructor(private http: HttpClient, public routerOutlet: IonRouterOutlet,
    private actionSheetCtrl: ActionSheetController, public modalController: ModalController,  ) {

    }

   ngOnInit() {
    this.getMinds()
  }

  ionViewDidLoad(){

  }

  async openCamera() {
      const image = await Camera.getPhoto({
        quality: 60,
        allowEditing: true,
        resultType: CameraResultType.DataUrl
      });

      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      var imageUrl = image.webPath;
      alert(image.dataUrl)

  }

  async getMinds() {
    const url = "https://globallove.online/api/tdp/whatson/your/mind";
    await this.http.get(url).subscribe((res: any) => {
      this.data = true;
      this.minds = res.data;
      console.log(this.minds)
    });
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
    const modal = await this.modalController.create({
      initialBreakpoint: 1,
      component: DetailsPage,
      cssClass: 'my-custom-class',
      swipeToClose: false,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        'id': id,
      }
    });
    return await modal.present();
  }

}
