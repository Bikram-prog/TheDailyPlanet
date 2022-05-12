import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from  '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';

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
  comments: any = []

  constructor(
    private http: HttpClient,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private photoViewer: PhotoViewer,
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

}
