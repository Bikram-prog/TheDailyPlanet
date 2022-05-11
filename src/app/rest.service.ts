import { HttpClient } from  '@angular/common/http';
import { Injectable } from  '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  url: string;

  constructor(private http: HttpClient) {

  }

  login(username, password) {
    this.url = 'https://globallove.online/api/tdp/login/' + username + '/' + password;

    return this.http.get(this.url);
  }

  signup(name, username, password, repassword) {
    this.url = 'https://globallove.online/api/tdp/signup/' + name + '/' + username + '/' + password + '/' + repassword;

    return this.http.get(this.url);
  }

  getNews() {
    this.url = 'https://newsapi.org/v2/top-headlines?country=au&apiKey=dc0e0635bc1d48f6969eadc915a6dca1';

    return this.http.get(this.url);
  }

  getJobs(id) {
    if(id == "In-progress") {
      id = "in-progress";
    }
    this.url = 'https://globallove.online/api/tds/all/jobs/'+id+'/wwwmedia';

    return this.http.get(this.url);
  }
}
