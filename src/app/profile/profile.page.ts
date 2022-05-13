import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from  '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  // Data passed in by componentProps
  
  public data: any = false;
  name: string;
  sex: string;
  country: string;
  pro_pic: string='';
  news: any = []
  logID: string


  constructor(private http: HttpClient) { }

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

  

  

}
