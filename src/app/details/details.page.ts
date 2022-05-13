import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from  '@angular/common/http';
import { ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { SpinnerDialog } from '@awesome-cordova-plugins/spinner-dialog/ngx';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  // Data passed in by componentProps
  //@Input() id: string;

  post_id: string;
  news_img_path: string;
  news_title: string;
  news_desc: string;
  news_id: number;
  author_name: string;
  author_pic: string;
  comments: any = []
  public com = {text: ''}

  constructor(
    private http: HttpClient,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private photoViewer: PhotoViewer,
    private spinnerDialog: SpinnerDialog,
    private toast: ToastController,
  ) {

  }

  ngOnInit() {
    this.post_id = this.activatedRoute.snapshot.paramMap.get('id');

    const url = "https://globallove.online/api/tdp/whatson/your/mind/details/" + this.post_id;
    this.http.get(url).subscribe((res: any) => {
      this.news_img_path = res[0].news_img_path;
      this.news_title = res[0].news_title;
      this.news_desc = res[0].news_desc;
      this.news_id = res[0].news_id;
      this.author_name = res[0].author_name;
      this.author_pic = res[0].author_photo;
      this.comments = res[0].comments
    });
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  openImageViewer(img) {
    this.photoViewer.show(img);
  }

  post_comment() {
    this.spinnerDialog.show();
    const myheader = new HttpHeaders();
    //myheader.set('Access-Control-Allow-Origin', '*');
    myheader.set('Content-Type', 'application/x-www-form-urlencoded');

    const formData = new FormData();
    formData.append('newsID', this.post_id);
    formData.append('userID', localStorage.getItem('log_id'));
    formData.append('comment', this.com.text);

    this.http.post<any>('https://globallove.online/api/tdp/news/comment/insert', formData, {
      headers: myheader
    }).subscribe(response => {
      this.spinnerDialog.hide();
      this.com.text = '';
      if (response.success == 'success') {
        this.presentToast("You'r comment successfully posted.");
        this.dismiss();

        //get refreshed comments
        const url = "https://globallove.online/api/tdp/whatson/your/mind/details/" + this.post_id;
        this.http.get(url).subscribe((res: any) => {
          this.news_img_path = res[0].news_img_path;
          this.news_title = res[0].news_title;
          this.news_desc = res[0].news_desc;
          this.news_id = res[0].news_id;
          this.author_name = res[0].author_name;
          this.author_pic = res[0].author_photo;
          this.comments = res[0].comments;
        });
      }


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

}
