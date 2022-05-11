import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from  '@angular/common/http';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  // Data passed in by componentProps
  @Input() id: string;

  news_img_path: string;
  news_title: string;
  news_desc: string;
  news_id: number;
  author_name: string;
  comments: any = []

  constructor(
    private http: HttpClient,
    private modalController: ModalController,
  ) {

  }

  ngOnInit() {
    const url = "https://globallove.online/api/tdp/whatson/your/mind/details/" + this.id;
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

}
