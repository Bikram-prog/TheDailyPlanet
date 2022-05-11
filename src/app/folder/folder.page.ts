import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../rest.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { IonRouterOutlet, ActionSheetController, ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams } from  '@angular/common/http';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  public openModal: boolean = false;
  public folder: string;
  public data: any = false;

  news: any = [];
  minds: any = []

  constructor(private activatedRoute: ActivatedRoute, public restService: RestService, private iab: InAppBrowser, public routerOutlet: IonRouterOutlet,
    private actionSheetCtrl: ActionSheetController, public modalController: ModalController, private http: HttpClient) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

      this.restService.getNews().subscribe(
        (response: any) => { this.news = response.articles; this.data = true; },
        (error) => { console.log('error'); });


  }

  getMinds() {
    const url = "https://globallove.online/api/tdp/whatson/your/mind";
    this.http.get(url).subscribe((res: any) => {
      this.minds = res.data;
    });
  }

  gotoNewsDetails(url) {
    this.iab.create(url, "_blank", "location=yes");
  }

  startModal() {
    this.openModal = true;
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

}
