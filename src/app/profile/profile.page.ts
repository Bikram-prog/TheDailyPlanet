import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from  '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public data: any = false;
  name: string;
  sex: string;
  country: string;
  pro_pic: string='';
  news: any = []
  logID: string
  constructor(private http: HttpClient, private router: Router) {

  }

  ngOnInit() {
    this.pro_pic = ''
    this.logID=localStorage.getItem('log_id')
    const url = "https://globallove.online/api/tdp/profile/" + localStorage.getItem('log_id');
    this.http.get(url).subscribe((res: any) => {
      console.log(res.data[0].pro_pic)
      this.data = true;
      this.name = res.data[0].name;
      this.sex = res.data[0].sex;
      this.country = res.data[0].country;
      this.pro_pic = res.data[0].pro_pic;
      this.news = res.data[0].news
    });
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
